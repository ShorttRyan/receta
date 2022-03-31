import { Recipe } from '@prisma/client'
import { AxiosResponse } from 'axios'

export type DeleteRecipeSuccess = Recipe[]
export type DeleteRecipeFailure = {
  message: string
  code?: string
}

export type DeleteRecipeResponse = AxiosResponse<
  DeleteRecipeSuccess,
  DeleteRecipeFailure
>
