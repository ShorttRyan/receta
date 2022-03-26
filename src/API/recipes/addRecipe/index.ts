import axios from 'axios'
import { AddRecipeBody, AddRecipeResponse } from './types'

export * from './types'

export type AddRecipe = (
  recipe: AddRecipeBody,
) => Promise<[AddRecipeResponse?, any?]>

export const addRecipe: AddRecipe = async (recipe) => {
  try {
    const response = await axios.post('/api/recipes/create', recipe)
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
