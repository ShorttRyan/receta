import React from 'react'
import { FiHeart } from 'react-icons/fi'
import styles from './LikeButton.module.scss'

export interface LikeButtonProps {
  isLiked: boolean
  onClick: () => void
}

const LikeButton: React.FunctionComponent<LikeButtonProps> = ({ isLiked }) => {
  return (
    <button
      className={`${styles.heartWrapper} ${
        isLiked ? styles.liked : styles.unliked
      }`}
      type="button"
      aria-label={isLiked ? 'Unlike This Recipe' : 'Like This Recipe'}
    >
      <FiHeart
        className={`${styles.icon} ${isLiked ? styles.liked : styles.unliked}`}
      />
    </button>
  )
}

export default LikeButton
