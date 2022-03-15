import React from 'react'
import { Recipe } from '@prisma/client'
import styles from './MyRecipes.module.scss'
import IconButton from '../../../components/IconButton'

interface MyRecipesProps {
  recipes: Recipe[]
}

const MyRecipes: React.FunctionComponent<MyRecipesProps> = ({ recipes }) => {
  return (
    <div
      className={
        recipes.length > 0
          ? styles.myRecipes_Wrapper_Full
          : styles.myRecipes_Wrapper_Empty
      }
    >
      {recipes.length > 0 ? (
        <div className={styles.contentWrapper_Full}>Display Recipes</div>
      ) : (
        <div className={styles.contentWrapper_Empty}>
          <div className={styles.add_recipe_empty}>
            <IconButton onClick={() => console.log('HI')} />
          </div>
          <div className={styles.empty_title}>
            Looks like you dont have any recipes yet!
          </div>
        </div>
      )}
    </div>
  )
}

export default MyRecipes