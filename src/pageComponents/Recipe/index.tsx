import React, { useState } from 'react'
import styles from './RecipeContent.module.scss'
import {
  FiAtSign,
  FiCalendar,
  FiClock,
  FiEdit,
  FiHeart,
  FiLock,
  FiTarget,
  FiUser,
} from 'react-icons/fi'
import { toDate, toTime } from '../../utils/Client'
import { Prisma } from '@prisma/client'
import { getUnit } from '../AddRecipe/AddRecipeForm/IngredientSection/IngredientRow/getUnit'
import Link from 'next/link'
import IconButton from '../../components/IconButton'
import LikeButton from '../../components/LikeButton'
import { RecipeWithLikedBy } from '../../utils/extendedRecipe'

interface RecipeContentProps {
  recipe: RecipeWithLikedBy
  isOwner: boolean
  permitted: boolean
}

const RecipeContent: React.FunctionComponent<RecipeContentProps> = ({
  recipe,
  isOwner,
  permitted,
}) => {
  const {
    title,
    authorUsername,
    authorName,
    publishedAt,
    isDraft,
    timeToComplete,
    description,
  } = recipe
  const ingredients = recipe?.ingredients as Prisma.JsonObject[]
  const instructions = recipe?.instructions as Prisma.JsonObject[]
  const notes = recipe?.notes as Prisma.JsonObject[]
  const initiallyLiked = recipe?.likedBy?.length === 1
  const [isLiked, setIsLiked] = useState<boolean>(initiallyLiked)
  let change = 0
  if (initiallyLiked && !isLiked) change = -1
  if (!initiallyLiked && isLiked) change = 1
  return (
    <>
      <div className={`${styles.container} ${!permitted && styles.restrict} `}>
        <div className={styles.header}>
          <div className={styles.title}>
            {title}
            {isDraft && <span className={styles.draft_label}>[Draft]</span>}
          </div>
          <div className={styles.user_info_wrapper}>
            <div className={styles.meta}>
              <div className={styles.icon_wrapper}>
                <FiCalendar className={styles.icon} />
                <div className={styles.meta_title}>Published At:</div>
              </div>
              <div className={styles.label}>{toDate(publishedAt)}</div>
            </div>
            <div className={styles.meta}>
              <div className={styles.icon_wrapper}>
                <FiUser className={styles.icon} />
                <div className={styles.meta_title}>Author Name:</div>
              </div>
              <div className={styles.label}>{authorName}</div>
            </div>
            <div className={styles.meta}>
              <div className={styles.icon_wrapper}>
                <FiAtSign className={styles.icon} />
                <div className={styles.meta_title}>Author Username:</div>
              </div>
              <div className={styles.label}>{authorUsername}</div>
            </div>
            <div className={styles.meta}>
              <div className={styles.icon_wrapper}>
                <FiClock className={styles.icon} />
                <div className={styles.meta_title}>Time To Complete:</div>
              </div>
              <div className={styles.label}>{toTime(timeToComplete)}</div>
            </div>
            {!isDraft && (
              <div className={styles.meta}>
                <div className={styles.icon_wrapper}>
                  <FiHeart className={styles.icon} />
                  <div className={styles.meta_title}>Likes:</div>
                </div>
                <div className={styles.label}>
                  {(recipe?._count?.likedBy || 0) + change}
                </div>
              </div>
            )}
          </div>
          <div className={styles.edit_button}>
            {isOwner ? (
              <Link href={`/recipe/${recipe.id}/edit`}>
                <a>
                  <IconButton
                    Icon={FiEdit}
                    disabled={false}
                    style={'primary'}
                    size={'large'}
                    name={'Edit this recipe'}
                    useDiv={true}
                    onClick={() => null}
                  />
                </a>
              </Link>
            ) : (
              <LikeButton
                isLiked={isLiked}
                onClick={() => setIsLiked(!isLiked)}
                recipeId={recipe.id}
              />
            )}
          </div>
        </div>
        <div className={styles.recipe_content}>
          {description && (
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          )}
          {ingredients?.length > 0 && (
            <div className={styles.ingredient_section}>
              <div className={styles.section_title}>Ingredients</div>
              <div className={styles.ingredients_wrapper}>
                {ingredients.map((ingredient, index) => {
                  const name = ingredient?.name as string
                  const amount = ingredient?.amount as string
                  const unit = ingredient?.unit as string
                  const id = (ingredient?.id as string) || `${name} ${index}`
                  return (
                    <div className={styles.ingredient} key={id || index}>
                      <div className={styles.ingredient_icon_wrapper}>
                        <FiTarget className={styles.icon} />
                      </div>
                      <div className={styles.ingredient_name}>
                        {amount} {getUnit(unit, amount)} {name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {instructions?.length > 0 && (
            <div className={styles.ingredient_section}>
              <div className={styles.section_title}>Instructions</div>
              <div className={styles.instructions_wrapper}>
                {instructions.map((instruction, index) => {
                  const content = instruction?.value as string
                  const id =
                    (instruction?.id as string) || `${content} ${index}`
                  return (
                    <div className={styles.instruction} key={id || index}>
                      <div className={styles.number}>{index + 1}.</div>
                      <div className={styles.content}>{content}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {notes?.length > 0 && (
            <div className={styles.ingredient_section}>
              <div className={styles.section_title}>Notes</div>
              <div className={styles.instructions_wrapper}>
                {notes.map((note, index) => {
                  const content = note?.value as string
                  const id = (note?.id as string) || `${content} ${index}`
                  return (
                    <div
                      className={`${styles.instruction} ${styles.align}`}
                      key={id || index}
                    >
                      <div className={styles.icon}>
                        <FiTarget />
                      </div>
                      <div className={styles.content}>{content}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {!permitted && (
        <div className={styles.restricted_modal}>
          <div className={styles.restricted_content}>
            <div className={styles.icon}>
              <FiLock />
            </div>
            <div className={styles.label}>
              You are unauthorized to view this recipe
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RecipeContent
