import { NextApiRequest, NextApiResponse } from 'next'
import {
  logPrismaError,
  prisma,
  validateAccessToken,
} from '../../../../utils/Server'
import { Prisma } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { rid } = req.query
  const RID = rid as string
  switch (req.method) {
    case 'POST':
      const [token, error] = validateAccessToken(
        req.cookies?.auth,
        `POST /recipes/[${RID}]/like`,
        res,
      )
      if (token === undefined) break
      try {
        const likedRecipe = await prisma.recipe.update({
          where: {
            id: RID,
          },
          data: {
            likedBy: {
              connect: {
                id: token.id,
              },
            },
          },
        })
        const likedRecipes = await prisma.recipe.findMany({
          where: {
            likedBy: {
              some: {
                id: token.id,
              },
            },
          },
        })
        res.json(likedRecipes)
      } catch (e) {
        const errorResponse: {
          message: string
          prismaError?: Prisma.PrismaClientKnownRequestError
        } = {
          message: 'Failed to like recipe',
        }
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          logPrismaError(e, `POST /recipes/[${RID}]/like`)
          errorResponse.prismaError = e
        }
        res.json(errorResponse)
      }
      break
    default:
      res.status(405).json({
        message: `Method not allowed`,
      })
  }
}
