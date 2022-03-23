import React from 'react'
import styles from './DropDown.module.scss'

interface DropDownProps {
  id: string
  label: string
  name: string
  options: string[]
  onChange: (newVal: string) => void
}

const DropDown: React.FunctionComponent<DropDownProps> = ({
  id,
  label,
  name,
  options,
  onChange,
}) => {
  return (
    <div className={styles.dd_wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}:
      </label>
      <select
        className={styles.select}
        id={id}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option className={styles.option} key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropDown
