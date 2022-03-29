import React from 'react'
import { Recipe } from '@prisma/client'
import styles from './RecipeCard.module.scss'
import { FiClock, FiUser, FiCalendar, FiLock, FiAtSign } from 'react-icons/fi'
import { toDate, toTime } from '../../utils/Client'
import Link from 'next/link'

export interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const {
    title,
    id,
    isPrivate,
    authorUsername,
    publishedAt,
    authorName,
    timeToComplete,
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
            <FiLock className={styles.icons} />
            <div className={styles.label}>
              {isPrivate ? 'Private' : 'Public'}
            </div>
          </div>
          <div className={styles.time_stamp}>
            <FiCalendar className={styles.icons} />
            <div className={styles.label}>{toDate(publishedAt)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
