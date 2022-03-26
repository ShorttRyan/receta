import React, { useContext } from 'react'
import styles from './EmptySectionComponent.module.scss'
import IconButton from '../../../components/IconButton'
import { FiEdit } from 'react-icons/fi'
import { AddRecipeContext } from '../../../contexts/AddRecipeContext'

interface EmptySectionProps {
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
