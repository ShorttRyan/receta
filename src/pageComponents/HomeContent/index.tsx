import React, { useContext, useState } from 'react'
import styles from './HomeContent.module.scss'
import MyRecipes from './MyRecipes'
import LikedRecipes from './LikedRecipes'
import { HomePageProps } from '../../pages'
import { AddRecipeContext } from './AddRecipeContext'
import AddRecipe from './AddRecipeForm'

enum HomeTabs {
  MyRecipes = 'myRecipes',
  LikedRecipes = 'likedRecipes',
  MyDrafts = 'myDrafts',
}

const HomeContent: React.FunctionComponent<HomePageProps> = (props) => {
  const [content, switchContent] = useState<HomeTabs>(HomeTabs.MyRecipes)
  const { addingRecipe } = useContext(AddRecipeContext)
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
            <MyRecipes recipes={props.publishedRecipes} />
          )}
          {content === HomeTabs.LikedRecipes && (
            <LikedRecipes recipes={props.likedRecipes} />
          )}
        </>
      ) : (
        <AddRecipe />
      )}
    </div>
  )
}

export default HomeContent
