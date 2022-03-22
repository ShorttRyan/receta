import React from 'react'
import styles from './IconButton.module.scss'
import { IconType } from 'react-icons'

interface IconButtonProps {
  onClick: () => void
  Icon: IconType
  disabled: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: 'primary' | 'danger'
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  onClick,
  Icon,
  disabled,
  size,
  style,
}) => {
  let buttonClassNames = ''
  switch (size) {
    case 'sm':
      break
    case 'lg':
      break
    case 'md':
    default:
  }
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
