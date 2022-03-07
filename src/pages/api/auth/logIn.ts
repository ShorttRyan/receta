import {NextApiRequest, NextApiResponse} from 'next'
import {checkBody, email, logPrismaError, generateAccessToken, prisma} from '../../../utils'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import {serialize} from 'cookie'
import {cookieOptions} from '../../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const requiredFields: string[] = ['username', 'password']
    const emptyField = checkBody(req.body, requiredFields)
    if (emptyField !== undefined) {
      res.status(400).json({
        message: `${emptyField} field is required`
      })
    } else {
      try {
        const identifier = req.body.username
        const password = req.body.password
        const clause: Prisma.UserFindUniqueArgs = identifier.match(email) ?
          {where: {email: identifier}}
          :
          {where: {username: identifier}}
        const user = await prisma.user.findUnique(clause)
        if (user) {
          const encryptedPass = await bcrypt.hash(password, user.salt)
          if (encryptedPass === user.password) {
            const accessToken = generateAccessToken({username: user.username})
            res.setHeader('Set-Cookie', serialize('auth', String(accessToken), cookieOptions)).json({accessToken})
          } else {
            res.status(400).json({
              message: 'Username or password is incorrect.'
            })
          }
        } else {
          res.status(400).json({
            message: 'Username or password is incorrect.'
          })
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          logPrismaError(e, '/auth/logIn')
          res.status(400).json({
            code: e.code,
            message: 'Username or password is incorrect.'
          })
        }
      }
    }
  } else {
    res.status(405).json({
      message: `Method not allowed`,
    })
  }
}
