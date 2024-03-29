import React from 'react'
import styles from './Input.module.scss'

type InputProps = {
  name: string
  value: any
  setValue: (newValue: any) => void
  type: string
  placeholder: string
  id: string
  error: boolean
  useShake?: boolean
  message?: string
  onBlur?: () => void
  title?: boolean
}

const Input: React.FunctionComponent<InputProps> = ({
  name,
  type,
  placeholder,
  id,
  value,
  setValue,
  error,
  useShake,
  message,
  onBlur,
  title,
}) => {
  return (
    <div
      className={`${styles.form__group} ${styles.field}
       ${title && styles.title}
       ${!title && error && styles.form__group__error}${
        error && useShake && styles.form__group__shake
      }`}
    >
      <input
        type={type}
        className={`${styles.form__field} ${
          error && styles.form__field__error
        } ${title && styles.removeMargin}`}
        placeholder={placeholder}
        aria-label={name}
        name={name}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) =>
          type === 'number' &&
          ['e', 'E', '+', '-'].includes(e.key) &&
          e.preventDefault()
        }
        onBlur={onBlur ? () => onBlur() : undefined}
      />
      <label
        htmlFor={id}
        className={`${styles.form__label} ${title && styles.title} ${
          error && styles.form__label__error
        }`}
      >
        {name}
      </label>
      <div className={styles.form__error_message}>{error && message}</div>
    </div>
  )
}

export default Input
