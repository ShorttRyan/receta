import axios from 'axios'
import { UpdateRecipeBody, UpdateRecipeResponse } from './types'

export * from './types'

export type UpdateRecipe = (
  recipe: UpdateRecipeBody,
  recipeId: string,
) => Promise<[UpdateRecipeResponse?, any?]>

export const updateRecipe: UpdateRecipe = async (recipe, recipeId) => {
  try {
    const response = await axios.put(`/api/recipes/${recipeId}`, recipe)
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
