import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  label: string
  type: 'button' | 'submit' | 'reset'
  style?: 'primary' | 'danger' | 'login' | 'dangerCircle' | 'primaryCircle'
  disabled?: boolean
  onClick?: () => void
  muted?: boolean
}

const LoginButton: React.FunctionComponent<ButtonProps> = ({
  onClick,
  label,
  type,
  disabled,
  muted,
  style,
}) => {
  let buttonStyle
  switch (style) {
    case 'login':
      buttonStyle = `${styles.button} ${
        muted ? styles.login__muted : styles.login
      }`
      break
    case 'danger':
      buttonStyle = `${styles.button} ${
        disabled ? styles.danger__disabled : styles.danger
      }`
      break
    case 'dangerCircle':
      buttonStyle = `${styles.button} ${styles.circle} ${
        disabled ? styles.danger__disabled : styles.danger
      }`
      break
    case 'primaryCircle':
      buttonStyle = `${styles.button} ${styles.circle} ${
        disabled ? styles.primary__disabled : styles.primary
      }`
      break
    case 'primary':
    default:
      buttonStyle = `${styles.button} ${
        disabled ? styles.primary__disabled : styles.primary
      }`
      break
  }

  return (
    <button
      className={buttonStyle}
      onClick={onClick ? () => onClick() : undefined}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default LoginButton
