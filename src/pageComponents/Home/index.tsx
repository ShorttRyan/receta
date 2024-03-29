import React, { useContext, useState } from 'react'
import styles from './HomeContent.module.scss'

/* Contexts */
import { AddRecipeContext } from '../../contexts/AddRecipeContext'
import { UserDataContext } from '../../contexts/UserDataContext'

/* Child Components */
import AddRecipe from '../AddRecipe/AddRecipeForm'
import RecipeCardList from '../../components/RecipeCardList'

enum HomeTabs {
  MyRecipes = 'myRecipes',
  LikedRecipes = 'likedRecipes',
  MyDrafts = 'myDrafts',
}

const HomeContent: React.FunctionComponent = () => {
  const [content, switchContent] = useState<HomeTabs>(HomeTabs.MyRecipes)
  const { addingRecipe } = useContext(AddRecipeContext)
  const { published, liked, drafts } = useContext(UserDataContext)
  return (
    <div>
      {!addingRecipe ? (
        <>
          <div className={styles.subNavWrapper}>
            <div className={styles.bottomBar} />
            <div className={styles.subNavLinkWrapper}>
              <button
                className={`
                  ${styles.subNavLink} 
                  ${content === HomeTabs.MyRecipes && styles.activeTab}
                `}
                onClick={() => switchContent(HomeTabs.MyRecipes)}
                aria-label="My Recipes"
              >
                My Recipes
              </button>
              <button
                className={`
            ${styles.subNavLink} 
            ${content === HomeTabs.LikedRecipes && styles.activeTab}
            `}
                onClick={() => switchContent(HomeTabs.LikedRecipes)}
                aria-label="Liked Recipes"
              >
                Liked Recipes
              </button>
              <button
                className={`
            ${styles.subNavLink} 
            ${content === HomeTabs.MyDrafts && styles.activeTab}
            `}
                onClick={() => switchContent(HomeTabs.MyDrafts)}
                aria-label="My Drafts"
              >
                My Drafts
              </button>
            </div>
          </div>
          {content === HomeTabs.MyRecipes && (
            <RecipeCardList
              recipes={published}
              emptyListText="Looks like you haven't published any recipes yet!"
              canAddRecipes
              hideAuthor
            />
          )}
          {content === HomeTabs.LikedRecipes && (
            <RecipeCardList
              recipes={liked}
              emptyListText="Looks like you haven't liked any recipes yet!"
              hidePublic
            />
          )}
          {content === HomeTabs.MyDrafts && (
            <RecipeCardList
              recipes={drafts}
              emptyListText="You have no masterpieces in progress."
              hideAuthor
              canAddRecipes
            />
          )}
        </>
      ) : (
        <AddRecipe />
      )}
    </div>
  )
}

export default HomeContent
