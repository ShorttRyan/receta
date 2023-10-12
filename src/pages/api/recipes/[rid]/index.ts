import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

/* Utils */
import {
  checkOwner,
  prisma,
  reportError,
  validateAccessToken,
} from '../../../../utils/Server'

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { rid } = req.query
  const RID = rid as string
  const [token, error] = validateAccessToken(
    req.cookies?.auth,
    `${req.method} /recipes/[${RID}]`,
    res,
  )
  switch (req.method) {
    case 'DELETE':
      if (token === undefined) break
      if (!(await checkOwner(RID, token.id))) {
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
        reportError(
          e,
          'Failed to delete recipe',
          `DELETE /recipes/[${RID}]`,
          res,
        )
        break
      }
      break
    case 'PUT':
      if (token === undefined) break
      if (!(await checkOwner(RID, token.id))) {
        res.status(403).json({
          message: 'You are not authorized to modify this recipe.',
        })
        break
      }
      const payload: Prisma.RecipeUpdateInput = {}
      const { body } = req
      if (body?.title) payload.title = body?.title
      if (body?.timeToComplete) payload.timeToComplete = body?.timeToComplete
      if (body?.ingredients) payload.ingredients = body?.ingredients
      if (body?.instructions) payload.instructions = body?.instructions
      if (body?.notes) payload.notes = body?.notes
      if (body?.description) payload.description = body?.description
      payload.isPrivate = body?.isPrivate || false
      payload.isDraft = body?.isDraft || false
      try {
        await prisma.recipe.update({
          data: payload,
          where: {
            id: RID,
          },
        })
      } catch (e) {
        reportError(
          e,
          'Failed to update recipe - update recipe',
          `PUT /recipes/[${RID}]`,
          res,
        )
        break
      }
      try {
        const userRecipes = await prisma.recipe.findMany({
          where: {
            authorId: token.id,
          },
        })
        res.json(userRecipes)
      } catch (e) {
        reportError(
          e,
          'Failed to update recipe - get user recipes',
          `PUT /recipes/[${RID}]`,
          res,
        )
        break
      }
      break
    default:
      res.status(405).json({
        message: `Method not allowed`,
      })
  }
}
