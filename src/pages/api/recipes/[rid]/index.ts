import { NextApiRequest, NextApiResponse } from 'next'
import {
  checkOwner,
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
    case 'DELETE':
      const [token, error] = validateAccessToken(
        req.cookies?.auth,
        `POST /recipes/[${RID}]/like`,
        res,
      )
      if (token === undefined) break
      const isOwner = await checkOwner(RID, token.id)
      if (!isOwner) {
        res.status(403).json({
          message: 'You are not authorized to delete this recipe.',
        })
        break
      }
      try {
        await prisma.recipe.delete({
          where: {
            id: RID,
          },
        })
        const userRecipes = await prisma.recipe.findMany({
          where: {
            authorUsername: token.username,
          },
        })
        res.json(userRecipes)
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