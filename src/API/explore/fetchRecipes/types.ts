import { AxiosResponse } from 'axios'
import { ExtendedRecipe } from '../../../types/extendedRecipe'

export type FetchRecipesFailure = {
  message: string
  code?: string
}

export type FetchRecipesResponse = AxiosResponse<
  ExtendedRecipe[],
  FetchRecipesFailure
>
