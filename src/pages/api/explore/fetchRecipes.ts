import { NextApiRequest, NextApiResponse } from 'next'
import {
  checkBody,
  logPrismaError,
  validateAccessToken,
} from '../../../utils/Server'
import { Prisma } from '@prisma/client'
import { fetchNewest } from '../../../utils/Server/PrismaFunctions/fetchNewest'
import { ExploreTabs } from '../../../pageComponents/Explore/type'
import { fetchLiked } from '../../../utils/Server/PrismaFunctions/fetchLiked'

// noinspection JSUnusedGlobalSymbols
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const [token, error] = validateAccessToken(
    req.cookies?.auth,
    '/user/updateProfileInfo',
    res,
  )
  if (error) {
  }
  switch (req.method) {
    case 'GET':
      // noinspection JSUnusedLocalSymbols
      if (token === undefined) break
      const requiredFields: string[] = ['method', 'skip', 'take']
      if (checkBody(req.query, requiredFields, res)) {
        let response
        try {
          if (req.query.method === ExploreTabs.Newest) {
            response = await fetchNewest(
              parseInt(req.query.skip as string),
              parseInt(req.query.take as string),
              token.id,
            )
          }
          if (req.query.method === ExploreTabs.MostLiked) {
            response = await fetchLiked(
              parseInt(req.query.skip as string),
              parseInt(req.query.take as string),
              token.id,
            )
          }
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            logPrismaError(e, '/explore/fetchRecipe')
          }
          res.status(400).json({
            message: 'Error When Fetching Recipes.',
          })
        }
        res.json(response)
      }
      break
    default:
      res.status(405).json({
        message: `Method not allowed`,
      })
  }
}
