import axios from 'axios'
import { DeleteRecipeResponse } from './types'

export * from './types'

export type DeleteRecipe = (
  recipeId: string,
) => Promise<[DeleteRecipeResponse?, any?]>

export const deleteRecipe: DeleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(`/api/recipes/${recipeId}`)
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
