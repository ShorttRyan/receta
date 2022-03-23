import React from 'react'
import styles from './DropDown.module.scss'

interface DropDownProps {
  options: string[]
  value: string
  onChange: (newVal: string) => void
}

const DropDown: React.FunctionComponent<DropDownProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.dd_wrapper}>
      <select
        className={styles.select}
        value={value}
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
