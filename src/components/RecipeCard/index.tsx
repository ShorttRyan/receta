import React from 'react'
import styles from './RecipeCard.module.scss'
import {
  FiClock,
  FiUser,
  FiCalendar,
  FiLock,
  FiAtSign,
  FiUnlock,
  FiHeart,
} from 'react-icons/fi'
import { toDate, toTime } from '../../utils/Client'
import Link from 'next/link'
import { ExtendedRecipe } from '../../utils/extendedRecipe'

export interface RecipeCardProps {
  recipe: ExtendedRecipe
  skipPublic?: boolean
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({
  recipe,
  skipPublic,
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
          <div className={styles.author}>
            <FiUser className={styles.icons} />
            <div className={styles.label}>{authorName}</div>
          </div>
          <div className={styles.author}>
            <FiAtSign className={styles.icons} />
            <div className={styles.label}>{authorUsername}</div>
          </div>
          <div className={styles.time_stamp}>
            <FiClock className={styles.icons} />
            <div className={styles.label}>{toTime(timeToComplete)}</div>
          </div>
          <div className={styles.time_stamp}>
            {!skipPublic ? (
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
            ) : (
              <div className={styles.time_stamp}>
                <FiCalendar className={styles.icons} />
                <div className={styles.label}>{toDate(publishedAt)}</div>
              </div>
            )}
          </div>
          {!skipPublic && (
            <div className={styles.time_stamp}>
              <FiCalendar className={styles.icons} />
              <div className={styles.label}>{toDate(publishedAt)}</div>
            </div>
          )}
          {!isDraft && (
            <div className={styles.time_stamp}>
              <FiHeart className={styles.icons} />
              <div className={styles.label}>{recipe?._count?.likedBy || 0}</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
