import React, { useContext } from 'react'
import styles from './EmptySectionComponent.module.scss'

/* Contexts */
import { AddRecipeContext } from '../../../contexts/AddRecipeContext'

/* Child Components */
import { FiEdit } from 'react-icons/fi'
import IconButton from '../../IconButton'

type EmptySectionProps = {
  message: string
  showAddRecipeButton: boolean
}

const EmptySectionComponent: React.FunctionComponent<EmptySectionProps> = ({
  message,
  showAddRecipeButton,
}) => {
  const { setAddingRecipe } = useContext(AddRecipeContext)
  return (
    <div className={styles.contentWrapper_Empty}>
      {showAddRecipeButton && (
        <div className={styles.add_recipe_empty}>
          <IconButton
            onClick={() => setAddingRecipe(true)}
            Icon={FiEdit}
            disabled={false}
            style="primary"
            size="large"
            name="Upload a Recipe"
          />
        </div>
      )}
      <div className={styles.empty_title}>{message}</div>
    </div>
  )
}

export default EmptySectionComponent
