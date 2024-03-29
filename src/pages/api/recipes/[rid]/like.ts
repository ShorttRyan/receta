// noinspection DuplicatedCode

import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

/* Utils */
import {
  logPrismaError,
  prisma,
  validateAccessToken,
} from '../../../../utils/Server'

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { rid } = req.query
  const RID = rid as string
  switch (req.method) {
    case 'POST':
      // noinspection JSUnusedLocalSymbols
      const [token, error] = validateAccessToken(
        req.cookies?.auth,
        `POST /recipes/[${RID}]/like`,
        res,
      )
      if (token === undefined) break
      try {
        await prisma.recipe.update({
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
