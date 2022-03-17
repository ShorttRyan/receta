import React from 'react'
import styles from '../HomeContent.module.scss'
import { Recipe } from '@prisma/client'
import EmptySectionComponent from '../EmptySectionComponent'

interface LikedRecipesProps {
  recipes: Recipe[]
}

const LikedRecipes: React.FunctionComponent<LikedRecipesProps> = ({
  recipes,
}) => {
  return (
    <div
      className={
        recipes.length > 0
          ? styles.recipes_Wrapper_Full
          : styles.recipes_Wrapper_Empty
      }
    >
      {recipes.length > 0 ? (
        <div className={styles.contentWrapper_Full}>Display Liked Recipes</div>
      ) : (
        <EmptySectionComponent
          message={`Looks like you haven't liked any recipes yet!`}
          showAddRecipeButton={false}
        />
      )}
    </div>
  )
}

export default LikedRecipes
