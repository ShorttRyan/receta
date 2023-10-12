import React from 'react'
import styles from './LikeButton.module.scss'

/* APIs */
import { likeRecipe } from '../../API/recipes/[rid]/like'
import { unlikeRecipe } from '../../API/recipes/[rid]/unlike'

/* Child Components */
import { FiHeart } from 'react-icons/fi'

type LikeButtonProps = {
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
