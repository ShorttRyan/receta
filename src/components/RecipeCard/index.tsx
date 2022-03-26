import React from 'react'
import { Recipe } from '@prisma/client'

export interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const {
    title,
    ingredients,
    instructions,
    notes,
    isPrivate,
    isDraft,
    authorUsername,
    publishedAt,
    authorName,
    authorId,
    timeToComplete,
  } = recipe
  return <div>{title}</div>
}

export default RecipeCard
