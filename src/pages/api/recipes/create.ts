import { NextApiRequest, NextApiResponse } from 'next'
import { checkBody, validateAccessToken } from '../../../utils/Server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      const [token, error] = validateAccessToken(
        req.cookies?.auth,
        '/user/updateProfileInfo',
        res,
      )
      if (token === undefined) break
      const requiredFields: string[] = [
        'title',
        'private',
        'timeToComplete',
        'ingredients',
        'steps',
        'notes',
      ]
      if (checkBody(req.body, requiredFields, res)) {
        try {
          const recipe = await prisma.recipe.create({
            data: {
              author: {
                connect: {
                  username: token.username,
                },
              },
              private: req.body.private,
              publishedAt: Date.now(),
              title: req.body.title,
              timeToComplete: req.body.timeToComplete,
              ingredients: req.body.ingredients,
              steps: req.body.steps,
              notes: req.body.notes,
            },
          })
          res.json({ message: 'SUCCESS' })
        } catch (e) {
          res.json({ message: 'FAILURE' })
        }
      }
      break
    default:
      res.status(405).json({
        message: `Method not allowed`,
      })
  }
}
