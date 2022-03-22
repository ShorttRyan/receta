import React from 'react'
import styles from './IconButton.module.scss'
import { IconType } from 'react-icons'

interface IconButtonProps {
  onClick: () => void
  Icon: IconType
  disabled: boolean
  style: 'primary' | 'danger'
  size: 'small' | 'medium' | 'large'
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  onClick,
  Icon,
  disabled,
  size,
  style,
}) => {
  let wrapperClassNames = `${styles.iconWrapper}`
  switch (size) {
    case 'small':
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
    case 'large':
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
    case 'medium':
    default:
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
  }
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={styles.buttonWrapper}
      disabled={disabled}
    >
      <div className={wrapperClassNames}>
        <Icon className={styles.icon} />
      </div>
    </button>
  )
}

export default IconButton
