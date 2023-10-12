import React, { useState } from 'react'
import sharedStyles from '../Home/HomeContent.module.scss'
import styles from './Explore.module.scss'

/* API */
import { fetchRecipes } from '../../API/explore'

/* Types */
import { ExploreTabs } from './type'
import { ExtendedRecipe } from '../../types/extendedRecipe'
import { ExplorePageProps } from '../../pages/explore'

/* Child Components */
import RecipeCard from '../../components/RecipeCard'
import Button from '../../components/Button'

const ExplorePage: React.FunctionComponent<ExplorePageProps> = ({
  totalRecipes,
  mostLiked,
  newest,
}) => {
  const [currentTab, setCurrentTab] = useState<ExploreTabs>(ExploreTabs.Newest)
  const [mostLikedList, setMostLikedList] =
    useState<ExtendedRecipe[]>(mostLiked)
  const [newestList, setNewestList] = useState<ExtendedRecipe[]>(newest)
  const [loading, setLoading] = useState<boolean>(false)
  let activeList
  switch (currentTab) {
    case ExploreTabs.MostLiked:
      activeList = mostLikedList
      break
    case ExploreTabs.Newest:
    default:
      activeList = newestList
      break
  }
  return (
    <div>
      <div>
        <div className={sharedStyles.subNavWrapper}>
          <div className={sharedStyles.bottomBar} />
          <div className={sharedStyles.subNavLinkWrapper}>
            <button
              className={`
            ${sharedStyles.subNavLink} 
            ${currentTab === ExploreTabs.Newest && sharedStyles.activeTab}
            `}
              onClick={() => setCurrentTab(ExploreTabs.Newest)}
              aria-label="Newest"
            >
              Newest
            </button>
            <button
              className={`
            ${sharedStyles.subNavLink} 
            ${currentTab === ExploreTabs.MostLiked && sharedStyles.activeTab}
            `}
              onClick={() => setCurrentTab(ExploreTabs.MostLiked)}
              aria-label="Most Liked"
            >
              Most Liked
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className={sharedStyles.recipe_results_wrapper}>
          {activeList.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              hidePublic
              hideAuthor={false}
            />
          ))}
        </div>
        <div className={styles.loadMoreWrapper}>
          <Button
            type="button"
            name="Load More"
            style="primary"
            label="Load More"
            disabled={loading || activeList.length === totalRecipes}
            onClick={async () => {
              setLoading(true)
              switch (currentTab) {
                case ExploreTabs.MostLiked:
                  const [likedRecipes, likedError] = await fetchRecipes(
                    currentTab,
                    mostLikedList.length,
                  )
                  if (likedRecipes !== undefined)
                    setMostLikedList([...mostLikedList, ...likedRecipes.data])
                  break
                case ExploreTabs.Newest:
                default:
                  const [newRecipes, newestError] = await fetchRecipes(
                    currentTab,
                    newestList.length,
                  )
                  if (newRecipes !== undefined)
                    setNewestList([...newestList, ...newRecipes.data])
                  break
              }
              setLoading(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
