import { Recipe } from '@prisma/client'

export interface ExtendedRecipe extends Recipe {
  _count: {
    likedBy: number
  }
}
