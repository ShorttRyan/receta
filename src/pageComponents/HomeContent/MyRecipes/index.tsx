import React, { useContext } from 'react'
import { Recipe } from '@prisma/client'
import styles from '../HomeContent.module.scss'
import { AddRecipeContext } from '../AddRecipeContext'
import AddRecipe from '../AddRecipeForm'
import EmptySectionComponent from '../EmptySectionComponent'

interface MyRecipesProps {
  recipes: Recipe[]
}

const MyRecipes: React.FunctionComponent<MyRecipesProps> = ({ recipes }) => {
  const { addingRecipe } = useContext(AddRecipeContext)
  return (
    <div
      className={
        recipes.length > 0
          ? styles.recipes_Wrapper_Full
          : styles.recipes_Wrapper_Empty
      }
    >
      {addingRecipe ? (
        <AddRecipe />
      ) : (
        <>
          {recipes.length > 0 ? (
            <div className={styles.contentWrapper_Full}>
              Display Published Recipes
            </div>
          ) : (
            <EmptySectionComponent
              message={`Looks like you haven't published any recipes yet!`}
              showAddRecipeButton={true}
            />
          )}
        </>
      )}
    </div>
  )
}

export default MyRecipes
