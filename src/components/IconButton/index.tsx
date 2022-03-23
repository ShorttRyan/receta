import React from 'react'
import styles from './IconButton.module.scss'
import { IconType } from 'react-icons'

interface IconButtonProps {
  onClick: () => void
  Icon: IconType
  disabled: boolean
  style: 'primary' | 'danger'
  size: 'small' | 'medium' | 'large'
  name: string
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  onClick,
  Icon,
  disabled,
  size,
  style,
  name,
}) => {
  let buttonClassNames
  let wrapperClassNames = `${styles.iconWrapper}`
  switch (size) {
    case 'small':
      buttonClassNames = styles.small_button
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
    case 'large':
      buttonClassNames = styles.large_button
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
    case 'medium':
    default:
      buttonClassNames = styles.medium_button
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
  }
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={buttonClassNames}
      disabled={disabled}
      aria-label={name}
    >
      <div className={wrapperClassNames}>
        <Icon className={styles.icon} />
      </div>
    </button>
  )
}

export default IconButton
