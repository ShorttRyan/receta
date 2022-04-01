import React from 'react'
import { FiHeart } from 'react-icons/fi'
import styles from './LikeButton.module.scss'
import { likeRecipe } from '../../API/recipes/[rid]/like'
import { unlikeRecipe } from '../../API/recipes/[rid]/unlike'

export interface LikeButtonProps {
  isLiked: boolean
  onClick: () => void
  recipeId: string
}

const LikeButton: React.FunctionComponent<LikeButtonProps> = ({
  isLiked,
  onClick,
  recipeId,
}) => {
  return (
    <button
      className={`${styles.heartWrapper} ${
        isLiked ? styles.liked : styles.unliked
      }`}
      type="button"
      aria-label={isLiked ? 'Unlike This Recipe' : 'Like This Recipe'}
      onClick={() => {
        if (isLiked) {
          unlikeRecipe(recipeId)
        } else {
          likeRecipe(recipeId)
        }
        onClick()
      }}
    >
      <FiHeart
        className={`${styles.icon} ${isLiked ? styles.liked : styles.unliked}`}
      />
    </button>
  )
}

export default LikeButton
