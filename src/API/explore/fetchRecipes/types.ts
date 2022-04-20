import { AxiosResponse } from 'axios'
import { ExtendedRecipe } from '../../../utils/extendedRecipe'

export type FetchRecipesFailure = {
  message: string
  code?: string
}

export type FetchRecipesResponse = AxiosResponse<
  ExtendedRecipe[],
  FetchRecipesFailure
>
