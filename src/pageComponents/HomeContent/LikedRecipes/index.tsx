import React from 'react'
import styles from '../HomeContent.module.scss'
import { Recipe } from '@prisma/client'

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
        <div className={styles.contentWrapper_Empty}>
          <div className={styles.empty_title}>
            Looks like you haven{`'`}t liked any recipes yet!
          </div>
        </div>
      )}
    </div>
  )
}

export default LikedRecipes
