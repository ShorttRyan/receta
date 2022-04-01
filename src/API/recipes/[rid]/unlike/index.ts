import axios from 'axios'
import { LikeRecipeResponse } from '../like'

export type UnlikeRecipe = (
  recipeId: string,
) => Promise<[LikeRecipeResponse?, any?]>

export const unlikeRecipe: UnlikeRecipe = async (recipeId) => {
  try {
    const response = await axios.post(`/api/recipes/${recipeId}/unlike`)
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
