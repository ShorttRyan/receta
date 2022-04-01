import React, { useState } from 'react'
import { Recipe } from '@prisma/client'
import styles from '../HomeContent.module.scss'
import EmptySectionComponent from '../EmptySectionComponent'
import RecipeCard from '../../../components/RecipeCard'
import DropDown from '../../../components/DropDown'
import { SortingFunctions, SortingTypes } from '../MyRecipes/types'

interface LikedRecipes {
  recipes: Recipe[]
}

const LikedRecipes: React.FunctionComponent<LikedRecipes> = ({ recipes }) => {
  const [sortingVal, setSortingVal] = useState<string>(SortingTypes.newest)
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
          <div className={styles.controls}>
            <div className={styles.sortingWrapper}>
              <DropDown
                options={[...Object.values(SortingTypes)]}
                value={sortingVal}
                onChange={(newVal) => setSortingVal(newVal)}
              />
            </div>
          </div>
          <div className={styles.recipe_results_wrapper}>
            {recipes
              .sort((a, b) =>
                SortingFunctions[sortingVal as SortingTypes](a, b),
              )
              .map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </div>
      ) : (
        <EmptySectionComponent
          message={`Looks like you haven't liked any recipes yet!`}
          showAddRecipeButton={true}
        />
      )}
    </div>
  )
}

export default LikedRecipes
