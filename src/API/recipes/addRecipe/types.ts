import { AxiosResponse } from 'axios'
import { Ingredient } from '../../../pageComponents/AddRecipe/AddRecipeForm/IngredientSection/types'
import {
  Instruction,
  Note,
} from '../../../pageComponents/AddRecipe/AddRecipeForm/InstructionsSection/types'
import { ExtendedRecipe } from '../../../utils/extendedRecipe'

export interface AddRecipeBody {
  title: string
  timeToComplete: number
  ingredients: Ingredient[]
  instructions: Instruction[]
  notes: Note[]
  isPrivate: boolean
  isDraft: boolean
}

export type AddRecipeSuccess = ExtendedRecipe[]
export type AddRecipeFailure = {
  message: string
  code?: string
}

export type AddRecipeResponse = AxiosResponse<
  AddRecipeSuccess,
  AddRecipeFailure
>
