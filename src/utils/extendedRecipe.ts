import { Prisma } from '@prisma/client'

export type ExtendedRecipe = Prisma.RecipeGetPayload<{
  include: {
    _count: {
      select: {
        likedBy: true
      }
    }
  }
}>
export type RecipeWithLikedBy = Prisma.RecipeGetPayload<{
  include: {
    _count: {
      select: {
        likedBy: true
      }
    }
    likedBy: {
      select: {
        id: true
      }
    }
  }
}>
