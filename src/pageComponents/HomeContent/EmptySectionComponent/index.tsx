import React, { useContext } from 'react'
import styles from './EmptySectionComponent.module.scss'
import IconButton from '../../../components/IconButton'
import { HomeLogicContext } from '../HomeLogicProvider'
import { FiEdit } from 'react-icons/fi'

interface EmptySectionProps {
  message: string
  showAddRecipeButton: boolean
}

const EmptySectionComponent: React.FunctionComponent<EmptySectionProps> = ({
  message,
  showAddRecipeButton,
}) => {
  const { setAddingRecipe } = useContext(HomeLogicContext)
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
          />
        </div>
      )}
      <div className={styles.empty_title}>{message}</div>
    </div>
  )
}

export default EmptySectionComponent
