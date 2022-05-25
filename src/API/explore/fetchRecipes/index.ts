import axios from 'axios'
import { FetchRecipesResponse } from './types'
import { ExploreTabs } from '../../../pageComponents/Explore/type'

export * from './types'

export type FetchRecipes = (
  method: ExploreTabs,
  skip: number,
) => Promise<[FetchRecipesResponse?, any?]>

export const fetchRecipes: FetchRecipes = async (method, skip) => {
  try {
    const response = await axios.get('/api/explore/fetchRecipes', {
      params: {
        method,
        skip,
        take: parseInt(process.env.NEXT_PUBLIC_EXPLORE_RESULTS as string),
      },
    })
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
