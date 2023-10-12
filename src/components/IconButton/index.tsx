import React from 'react'
import styles from './IconButton.module.scss'
import { IconType } from 'react-icons'

type IconButtonProps = {
  onClick?: () => void
  Icon: IconType
  disabled: boolean
  style: 'primary' | 'danger'
  size: 'small' | 'medium' | 'large'
  name: string
  useDiv?: boolean
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  onClick,
  Icon,
  disabled,
  size,
  style,
  name,
  useDiv,
}) => {
  let buttonClassNames = `${styles.button}`
  let wrapperClassNames = `${styles.iconWrapper}`
  switch (size) {
    case 'small':
      buttonClassNames += ` ${styles.small_button}`
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
    case 'large':
      buttonClassNames += ` ${styles.large_button}`
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
    case 'medium':
    default:
      buttonClassNames += ` ${styles.medium_button}`
      wrapperClassNames += ` ${disabled ? styles.disabled : styles[style]}`
      wrapperClassNames += ` ${styles[size]}`
      break
  }
  return useDiv ? (
    <div className={buttonClassNames}>
      <div className={wrapperClassNames}>
        <Icon className={styles.icon} />
      </div>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => onClick !== undefined && onClick()}
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
