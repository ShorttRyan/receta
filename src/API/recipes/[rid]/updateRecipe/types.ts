import { Recipe } from '@prisma/client'
import { Ingredient } from '../../../../pageComponents/AddRecipe/AddRecipeForm/IngredientSection/types'
import {
  Instruction,
  Note,
} from '../../../../pageComponents/AddRecipe/AddRecipeForm/InstructionsSection/types'
import { AxiosResponse } from 'axios'

export type UpdateRecipeBody = {
  title: string
  timeToComplete: number
  ingredients: Ingredient[]
  instructions: Instruction[]
  notes: Note[]
  isPrivate: boolean
  isDraft: boolean
}

export type UpdateRecipeSuccess = Recipe[]
export type UpdateRecipeFailure = {
  message: string
  code?: string
}

export type UpdateRecipeResponse = AxiosResponse<
  UpdateRecipeSuccess,
  UpdateRecipeFailure
>
