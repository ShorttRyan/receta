import { NextApiRequest, NextApiResponse } from 'next'
import {
  checkBody,
  generateAccessToken,
  logPrismaError,
  prisma,
  validateAccessToken,
} from '../../../utils/Server'
import { Prisma } from '@prisma/client'
import { serialize } from 'cookie'
import { cookieOptions } from '../../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const requiredFields: string[] = ['email', 'firstName', 'lastName']
    const emptyField = checkBody(req.body, requiredFields)
    if (emptyField !== undefined) {
      res.status(400).json({
        message: `${emptyField} field is required`,
      })
    } else {
      try {
        const [token, error] = validateAccessToken(req.cookies?.auth, res)
        if (token) {
          const user = await prisma.user.update({
            where: {
              username: token.username,
            },
            data: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
            },
          })
          const accessToken = generateAccessToken({
            username: token.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
          })
          res.setHeader(
            'Set-Cookie',
            serialize('auth', String(accessToken), cookieOptions),
          )
          res.json({ message: 'Updated profile successfully.' })
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          logPrismaError(e, '/user/updateProfileInfo')
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
