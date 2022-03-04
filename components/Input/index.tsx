import React from 'react'
import styles from './Input.module.scss'

interface InputProps {
  name: string
  type: string
  placeholder: string
  id: string
}

const Input: React.FunctionComponent<InputProps> = ({
  name,
  type,
  placeholder,
  id,
}) => {
  return (
    <div className={`${styles.form__group} ${styles.field}`}>
      <input
        type={type}
        className={styles.form__field}
        placeholder={placeholder}
        name={name}
        id={id}
      />
      <label
        htmlFor={id}
        className={styles.form__label}
      >
        {name}
      </label>
    </div>
  )
}

export default Input
