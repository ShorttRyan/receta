import {NextApiRequest, NextApiResponse} from 'next'
import {checkBody} from '../../../utils'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '.prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requiredFields: string[] = ['email', 'username', 'password', 'firstName', 'lastName']
  const emptyField = checkBody(req.body, requiredFields)
  if (emptyField !== undefined) {
    res.status(400).json({
      message: `${emptyField} field is required`
    })
  } else {
    const salt = await bcrypt.genSalt()
    const encryptedPass = await bcrypt.hash(req.body.password, salt)
    try {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          username: req.body.username,
          password: encryptedPass,
          salt,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        }
      })
      if (user) {
        const accessToken = jwt.sign({
          username: req.body.username
        },process.env.ACCESS_TOKEN_SECRET as string)
        res.json({accessToken})
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(
          '######################\ncode:',
          e.code,
          '\nlocation: users/signUp\n',
          e.message,
          '\n######################'
        )
        const meta = e.meta as any
        if (e.code === 'P2002') {
          res.status(400).json({
            code: e.code,
            field: meta?.target[0],
            message: `Request could not be completed due to non-unique fields.`,
          })
        }
      }
    }
  }
}
