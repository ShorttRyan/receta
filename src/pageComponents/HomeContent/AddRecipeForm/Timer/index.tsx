import React from 'react'
import styles from './Timer.module.scss'
import IconButton from '../../../../components/IconButton'

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
      <IconButton onClick={() => setValue(value - increment)} />
      {label}
      <IconButton onClick={() => setValue(value + increment)} />
    </div>
  )
}

export default Timer
