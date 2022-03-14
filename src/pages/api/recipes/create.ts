import { NextApiRequest, NextApiResponse } from 'next'
import { checkBody, validateAccessToken } from '../../../utils/Server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const [token, error] = validateAccessToken(
    req.cookies?.auth,
    '/user/updateProfileInfo',
    res,
  )
  if (token === undefined) return
  const requiredFields: string[] = [
    'title',
    'cookTime',
    'ingredients',
    'steps',
    'notes',
  ]
  if (checkBody(req.body, requiredFields, res)) {
    console.log(token)
    try {
      const recipe = await prisma.person.create({
        data: {
          body: 'testing123',
        },
      })
      console.log(recipe)
      res.json({ message: 'SUCCESS' })
    } catch (e) {
      console.log(e)
      res.json({ message: 'FAILURE' })
    }
  }
}
