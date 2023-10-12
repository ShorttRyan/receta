import React from 'react'
import Link from 'next/link'
import styles from './RecipeCard.module.scss'

/* Child Components */
import {
  FiClock,
  FiUser,
  FiCalendar,
  FiLock,
  FiAtSign,
  FiUnlock,
  FiHeart,
} from 'react-icons/fi'

/* Utils */
import { toDate, toTime } from '../../utils'

/* Types */
import { ExtendedRecipe } from '../../types/extendedRecipe'

export type RecipeCardProps = {
  recipe: ExtendedRecipe
  hideAuthor: boolean
  hidePublic: boolean
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({
  recipe,
  hideAuthor,
  hidePublic,
}) => {
  const {
    title,
    id,
    isPrivate,
    authorUsername,
    publishedAt,
    authorName,
    timeToComplete,
    isDraft,
  } = recipe
  return (
    <Link href={`/recipe/${id}`} passHref={true}>
      <div className={styles.card_container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.card_info}>
          {!hideAuthor && (
            <>
              <div className={styles.author}>
                <FiUser className={styles.icons} />
                <div className={styles.label}>{authorName}</div>
              </div>
              <div className={styles.author}>
                <FiAtSign className={styles.icons} />
                <div className={styles.label}>{authorUsername}</div>
              </div>
            </>
          )}
          <div className={styles.recipe_trait}>
            <FiClock className={styles.icons} />
            <div className={styles.label}>{toTime(timeToComplete)}</div>
          </div>
          {!isDraft && (
            <div className={styles.recipe_trait}>
              <FiHeart className={styles.icons} />
              <div className={styles.label}>{recipe?._count?.likedBy || 0}</div>
            </div>
          )}
          {!hidePublic && (
            <div className={styles.recipe_trait}>
              <>
                {isPrivate ? (
                  <FiLock className={styles.icons} />
                ) : (
                  <FiUnlock className={styles.icons} />
                )}

                <div className={styles.label}>
                  {isPrivate ? 'Private' : 'Public'}
                </div>
              </>
            </div>
          )}
          <div className={styles.recipe_trait}>
            <FiCalendar className={styles.icons} />
            <div className={styles.label}>{toDate(publishedAt)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
