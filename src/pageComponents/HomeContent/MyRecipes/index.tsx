import React from 'react'
import { Recipe } from '@prisma/client'
import styles from '../HomeContent.module.scss'
import EmptySectionComponent from '../EmptySectionComponent'
import RecipeCard from '../../../components/RecipeCard'

interface MyRecipesProps {
  recipes: Recipe[]
}

const MyRecipes: React.FunctionComponent<MyRecipesProps> = ({ recipes }) => {
  return (
    <div
      className={
        recipes.length > 0
          ? styles.recipes_Wrapper_Full
          : styles.recipes_Wrapper_Empty
      }
    >
      {recipes.length > 0 ? (
        <div className={styles.contentWrapper_Full}>
          <div className={styles.recipe_results_wrapper}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      ) : (
        <EmptySectionComponent
          message={`Looks like you haven't published any recipes yet!`}
          showAddRecipeButton={true}
        />
      )}
    </div>
  )
}

export default MyRecipes
