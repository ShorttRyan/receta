import React from 'react'
import { Recipe } from '@prisma/client'
import styles from '../HomeContent.module.scss'
import EmptySectionComponent from '../EmptySectionComponent'

interface MyDraftsProps {
  recipes: Recipe[]
}

const MyDrafts: React.FunctionComponent<MyDraftsProps> = ({ recipes }) => {
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
          Display Published Recipes
        </div>
      ) : (
        <EmptySectionComponent
          message={`Looks like you don't have any drafts yet!`}
          showAddRecipeButton={false}
        />
      )}
    </div>
  )
}

export default MyDrafts
