import React, { useState } from 'react'
import styles from '../../pageComponents/Home/HomeContent.module.scss'

/* Types */
import { ExtendedRecipe } from '../../types/extendedRecipe'

/* Child Components */
import EmptySectionComponent from './EmptySectionComponent'
import RecipeCard from '../RecipeCard'
import DropDown from '../DropDown'

/* Utils */
import { SortingFunctions, SortingTypes } from '../../utils'

type RecipeCardList = {
  recipes: ExtendedRecipe[]
  emptyListText: string
  canAddRecipes?: boolean
  hideAuthor?: boolean
  hidePublic?: boolean
}

const RecipeCardList: React.FunctionComponent<RecipeCardList> = ({
  recipes,
  emptyListText,
  canAddRecipes = false,
  hideAuthor = false,
  hidePublic = false,
}) => {
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
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  hideAuthor={hideAuthor}
                  hidePublic={hidePublic}
                />
              ))}
          </div>
        </div>
      ) : (
        <EmptySectionComponent
          message={emptyListText}
          showAddRecipeButton={canAddRecipes}
        />
      )}
    </div>
  )
}

export default RecipeCardList
