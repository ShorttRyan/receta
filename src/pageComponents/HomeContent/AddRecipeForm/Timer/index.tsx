import React from 'react'
import styles from './Timer.module.scss'
import Button from '../../../../components/Button'

interface TimerProps {
  label: string
  value: number
  setValue: (newVal: number) => void
  increment: number
}
const Timer: React.FunctionComponent<TimerProps> = ({
  label,
  value,
  setValue,
  increment,
}) => {
  return (
    <div className={styles.timer_wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.controls}>
        <Button
          label="-"
          type="button"
          onClick={() => setValue(value - increment)}
          style="dangerCircle"
          disabled={value === 0}
        />
        <div className={styles.value_wrapper}>
          <div className={styles.value}>{value}</div>
        </div>
        <Button
          label="+"
          type="button"
          onClick={() => setValue(value + increment)}
          style="primaryCircle"
        />
      </div>
    </div>
  )
}

export default Timer
