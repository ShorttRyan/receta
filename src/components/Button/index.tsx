import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  label: string
  disabled?: boolean
  onClick?: () => void
  muted?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  label,
  type,
  disabled,
  muted,
}) => {
  return (
    <button
      className={`${muted ? styles.mutedButton : styles.primaryButton} ${
        disabled && styles.disabledButton
      }`}
      onClick={onClick ? () => onClick() : undefined}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
