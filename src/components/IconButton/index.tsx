import React from 'react'
import styles from './IconButton.module.scss'
import { FiEdit } from 'react-icons/fi'

interface IconButtonProps {
  onClick: () => void
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={styles.buttonWrapper}
    >
      <div className={`${styles.iconWrapper} ${styles.iconFill}`}>
        <FiEdit className={styles.icon} />
      </div>
    </button>
  )
}

export default IconButton
