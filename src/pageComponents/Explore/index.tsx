import React, { useState } from 'react'
import { ExplorePageProps } from '../../pages/explore'
import sharedStyles from '../Home/HomeContent.module.scss'
import RecipeCard from '../../components/RecipeCard'
import { ExploreTabs } from './type'
import { ExtendedRecipe } from '../../utils/extendedRecipe'
import Button from '../../components/Button'
import { fetchRecipes } from '../../API/explore'
import styles from './Explore.module.scss'

const ExplorePage: React.FunctionComponent<ExplorePageProps> = ({
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
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className={styles.loadMoreWrapper}>
          <Button
            type="button"
            name="Load More"
            style="primary"
            label="Load More"
            muted={loading}
            onClick={async () => {
              setLoading(true)
              const [newRecipes, error] = await fetchRecipes(
                currentTab,
                activeList.length,
                parseInt(process.env.EXPLORE_RESULTS || '6'),
              )
              if (newRecipes !== undefined) {
                switch (currentTab) {
                  case ExploreTabs.MostLiked:
                    setMostLikedList([...mostLikedList, ...newRecipes.data])
                    break
                  case ExploreTabs.Newest:
                  default:
                    setNewestList([...newestList, ...newRecipes.data])
                    break
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
