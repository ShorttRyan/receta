import { NextApiRequest, NextApiResponse } from 'next'
import {
  checkBody,
  logPrismaError,
  prisma,
  validateAccessToken,
} from '../../../utils/Server'
import { Prisma } from '@prisma/client'

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
          await prisma.recipe.create({
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
          const userRecipes = await prisma.recipe.findMany({
            where: {
              authorUsername: token.username,
            },
          })
          const updatedRecipes = JSON.parse(
            JSON.stringify(userRecipes, (key, value) =>
              typeof value === 'bigint' ? value.toString() : value,
            ),
          )
          res.json(updatedRecipes)
        } catch (e) {
          const errorResponse: {
            message: string
            prismaError?: Prisma.PrismaClientKnownRequestError
          } = {
            message: 'Failed to create recipe',
          }
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            logPrismaError(e, '/recipes/create')
            errorResponse.prismaError = e
          }
          res.json(errorResponse)
        }
      }
      break
    default:
      res.status(405).json({
        message: `Method not allowed`,
      })
  }
}
