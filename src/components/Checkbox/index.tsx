import React from 'react'
import { CheckboxProps } from './type'
import styles from './Checkbox.module.scss'

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  checked,
  setValue,
  name,
  ariaLabel,
}) => {
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={checked}
      onChange={() => setValue(!checked)}
      aria-label={ariaLabel}
      name={name}
    />
  )
}
export default Checkbox
