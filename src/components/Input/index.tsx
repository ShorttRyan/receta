import React from 'react'
import styles from './Input.module.scss'

interface InputProps {
  name: string
  value: any
  setValue: (newValue: any) => void
  type: string
  placeholder: string
  id: string
  error?: boolean
  message?: boolean
  onBlur?: () => void
}

const Input: React.FunctionComponent<InputProps> = ({
  name,
  type,
  placeholder,
  id,
  value,
  setValue,
  error,
  onBlur,
}) => {
  return (
    <div
      className={`${styles.form__group} ${styles.field} ${
        error && styles.form__group__error
      }`}
    >
      <input
        type={type}
        className={`${styles.form__field} ${
          error && styles.form__field__error
        }`}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur ? () => onBlur() : undefined}
      />
      <label
        htmlFor={id}
        className={`${styles.form__label} ${
          error && styles.form__label__error
        }`}
      >
        {name}
      </label>
    </div>
  )
}

export default Input
