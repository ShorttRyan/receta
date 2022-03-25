import React, { useContext } from 'react'
import { AddRecipeContext } from '../../AddRecipeContext'
import styles from './IsPrivateSection.module.scss'
import Checkbox from '../../../../components/Checkbox'

const IsPrivateSection: React.FunctionComponent = () => {
  const { isPrivate, setIsPrivate } = useContext(AddRecipeContext)

  return (
    <div className={styles.section_wrapper}>
      <Checkbox
        checked={isPrivate}
        setValue={setIsPrivate}
        name="Make this recipe private"
        ariaLabel="Make this recipe private"
      />
      <div className={styles.description_section}>
        <div className={styles.title}>Make this Recipe Private.</div>
        <div className={styles.subTitle}>
          Only you can see your private recipes.
        </div>
      </div>
    </div>
  )
}

export default IsPrivateSection
