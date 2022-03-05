import {NextApiRequest, NextApiResponse} from 'next'
import {checkBody, email} from '../../../utils'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import {Prisma} from '.prisma/client'


const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
          const accessToken = jwt.sign({
            username: req.body.username
          },process.env.ACCESS_TOKEN_SECRET as string)
          res.json({accessToken})
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
        console.log(
          '######################\ncode:',
          e.code,
          'at users/logIn\nmessage:',
          e.message,
          '\n######################'
        )
        res.status(400).json({
          code: e.code,
          message: 'Username or password is incorrect.'
        })
      }
    }
  }
}
