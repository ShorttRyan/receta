import React, { useState } from 'react'
import styles from './HomeContent.module.scss'
import MyRecipes from './MyRecipes'
import LikedRecipes from './LikedRecipes'
import { HomePageProps } from '../../pages'
import { AddRecipeProvider } from './AddRecipeContext'

enum HomeTabs {
  MyRecipes = 'myRecipes',
  LikedRecipes = 'likedRecipes',
}

const HomeContent: React.FunctionComponent<HomePageProps> = (props) => {
  const [content, switchContent] = useState<HomeTabs>(HomeTabs.MyRecipes)
  return (
    <AddRecipeProvider>
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
        </div>
      </div>
      {content === HomeTabs.MyRecipes && (
        <MyRecipes recipes={props.publishedRecipes} />
      )}
      {content === HomeTabs.LikedRecipes && (
        <LikedRecipes recipes={props.likedRecipes} />
      )}
    </AddRecipeProvider>
  )
}

export default HomeContent
