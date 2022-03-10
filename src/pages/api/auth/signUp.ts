import { NextApiRequest, NextApiResponse } from 'next'
import {
  checkBody,
  generateAccessToken,
  logPrismaError,
  prisma,
} from '../../../utils/Server'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import { serialize } from 'cookie'
import { cookieOptions } from '../../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const requiredFields: string[] = [
      'email',
      'username',
      'password',
      'firstName',
      'lastName',
    ]
    const emptyField = checkBody(req.body, requiredFields)
    if (emptyField !== undefined) {
      res.status(400).json({
        message: `${emptyField} field is required`,
      })
    } else {
      const salt = await bcrypt.genSalt()
      const encryptedPass = await bcrypt.hash(req.body.password, salt)
      try {
        const user = await prisma.user.create({
          data: {
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: encryptedPass,
            salt,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
        })
        if (user) {
          const accessToken = generateAccessToken({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          })
          res.setHeader(
            'Set-Cookie',
            serialize('auth', String(accessToken), cookieOptions),
          )
          res.json({ message: 'Signed up successfully.' })
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          logPrismaError(e, '/auth/signUp')
          const meta = e.meta as any
          if (e.code === 'P2002') {
            res.status(400).json({
              prismaCode: e.code,
              field: meta?.target[0],
              message: `Request could not be completed due to non-unique fields.`,
            })
          }
        }
      }
    }
  } else {
    res.status(405).json({
      message: `Method not allowed`,
    })
  }
}
