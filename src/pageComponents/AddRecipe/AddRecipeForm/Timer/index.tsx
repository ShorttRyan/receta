import React from 'react'
import styles from './Timer.module.scss'

/* Child Components */
import Button from '../../../../components/Button'

type TimerProps = {
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
          type="button"
          onClick={() => setValue(value - increment)}
          style="dangerCircle"
          disabled={value === 0}
          name={`decrease total for ${label}`}
        >
          <div className={styles.buttonOffset}>-</div>
        </Button>
        <div className={styles.value_wrapper}>
          <div className={`${styles.value} ${value === 0 && styles.empty}`}>
            {value}
          </div>
        </div>
        <Button
          type="button"
          onClick={() => setValue(value + increment)}
          style="primaryCircle"
          disabled={increment === 5 && value === 55}
          name={`increase total for ${label}`}
        >
          <div className={styles.buttonOffset2}>+</div>
        </Button>
      </div>
    </div>
  )
}

export default Timer
