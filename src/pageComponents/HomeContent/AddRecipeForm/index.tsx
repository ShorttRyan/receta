import React, { useState } from 'react'
import styles from './AddRecipeForm.module.scss'
import Input from '../../../components/Input'
import { AddRecipeForm, initialValue } from './types'
import Timer from './Timer'

const AddRecipe: React.FunctionComponent = () => {
  const [form, setForm] = useState<AddRecipeForm>(initialValue)
  const [hours, setHours] = useState<number>(1)
  const [minutes, setMinutes] = useState<number>(0)
  return (
    <form className={styles.form_wrapper}>
      <div className={styles.section_meta}>
        <Input
          name="Title"
          value={form.title.value}
          setValue={(newVal: string) => {
            const newForm = { ...form }
            newForm.title.value = newVal
            setForm(newForm)
          }}
          type="input"
          placeholder="Title"
          id="title"
          error={form.title.error}
          message={form.title.message}
        />
        <div className={styles.ttc_wrapper}>
          <div className={styles.input_name}>Time To Complete</div>
          <div className={styles.timer_wrapper}>
            <Timer
              label="Hours"
              value={hours}
              setValue={(newVal) => setHours(newVal)}
              increment={1}
            />
            <Timer
              label="Minutes"
              value={minutes}
              setValue={(newVal) => setMinutes(newVal)}
              increment={5}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddRecipe
