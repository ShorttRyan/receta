import axios from 'axios'
import { LikeRecipeResponse } from './types'

export * from './types'

export type LikeRecipe = (
  recipeId: string,
) => Promise<[LikeRecipeResponse?, any?]>

export const likeRecipe: LikeRecipe = async (recipeId) => {
  try {
    const response = await axios.post(`/api/recipes/${recipeId}/like`)
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
