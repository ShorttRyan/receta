import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  label?: string
  style?:
    | 'primary'
    | 'danger'
    | 'login'
    | 'dangerCircle'
    | 'primaryCircle'
    | 'option_selected'
    | 'option_unselected'
  disabled?: boolean
  onClick?: () => void
  muted?: boolean
  name: string
}

const LoginButton: React.FunctionComponent<ButtonProps> = ({
  onClick,
  label,
  type,
  disabled,
  muted,
  style,
  children,
  name,
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
    case 'option_selected':
      buttonStyle = `${styles.button} ${styles.option_selected}`
      break
    case 'option_unselected':
      buttonStyle = `${styles.button} ${styles.option_unselected}`
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
      aria-label={name}
    >
      {label}
      {children}
    </button>
  )
}

export default LoginButton
