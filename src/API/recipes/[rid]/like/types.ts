import { AxiosResponse } from 'axios'
import { ExtendedRecipe } from '../../../../types/extendedRecipe'

export type LikeRecipeSuccess = ExtendedRecipe[]
export type LikeRecipeFailure = {
  message: string
  code?: string
}

export type LikeRecipeResponse = AxiosResponse<
  LikeRecipeSuccess,
  LikeRecipeFailure
>
