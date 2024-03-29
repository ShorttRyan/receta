import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import { serialize } from 'cookie'

/* Utils */
import { email } from '../../../utils'
import {
  checkBody,
  logPrismaError,
  generateAccessToken,
  prisma,
} from '../../../utils/Server'

/* Constants */
import { cookieOptions } from '../../../constants/cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const requiredFields: string[] = ['username', 'password']
    if (checkBody(req.body, requiredFields, res)) {
      try {
        const identifier = req.body.username.toLowerCase()
        const password = req.body.password
        const clause: Prisma.UserFindUniqueArgs = identifier.match(email)
          ? { where: { email: identifier } }
          : { where: { username: identifier } }
        const user = await prisma.user.findUnique(clause)
        if (user) {
          const encryptedPass = await bcrypt.hash(password, user.salt)
          if (encryptedPass === user.password) {
            const accessToken = generateAccessToken({
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              id: user.id,
            })
            res.setHeader(
              'Set-Cookie',
              serialize('auth', String(accessToken), cookieOptions),
            )
            res.json({ message: 'Logged in successfully.' })
          } else {
            res.status(400).json({
              message: 'Username or password is incorrect.',
            })
          }
        } else {
          res.status(400).json({
            message: 'Username or password is incorrect.',
          })
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          logPrismaError(e, '/auth/logIn')
          res.status(400).json({
            code: e.code,
            message: 'Username or password is incorrect.',
          })
        } else {
          res.status(400).json(e)
        }
      }
    }
  } else {
    res.status(405).json({
      message: `Method not allowed`,
    })
  }
}
