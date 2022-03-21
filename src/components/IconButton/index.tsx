import React from 'react'
import styles from './IconButton.module.scss'
import { IconType } from 'react-icons'

interface IconButtonProps {
  onClick: () => void
  Icon: IconType
  disabled: boolean
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  onClick,
  Icon,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={styles.buttonWrapper}
      disabled={disabled}
    >
      <div
        className={`${disabled && styles.disabled} ${styles.iconWrapper} ${
          styles.iconFill
        }`}
      >
        <Icon className={styles.icon} />
      </div>
    </button>
  )
}

export default IconButton
