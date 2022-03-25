import axios from 'axios'
import { AddRecipeBody, AddRecipeResponse } from './types'

export * from './types'

export type AddRecipe = (
  recipe: AddRecipeBody,
) => Promise<[AddRecipeResponse?, any?]>

export const addRecipe: AddRecipe = async (recipe) => {
  try {
    console.log(recipe)
    const response = await axios.post('/api/recipe/create', recipe)
    return [response, undefined]
  } catch (e) {
    return [undefined, e]
  }
}
