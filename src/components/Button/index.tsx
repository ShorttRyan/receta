import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  label: string
  onClick?: () => void
  muted?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  label,
  type,
  muted,
}) => {
  return (
    <button
      className={muted ? styles.mutedButton : styles.primaryButton}
      onClick={onClick ? () => onClick() : undefined}
      type={type}
    >
      {label}
    </button>
  )
}

export default Button
