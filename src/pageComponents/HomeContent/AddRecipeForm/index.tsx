import React, { useState } from 'react'
import styles from './AddRecipeForm.module.scss'
import Input from '../../../components/Input'
import { AddRecipeForm, initialValue } from './types'
import Timer from './Timer'
import IngredientSection from './IngredientSection'
import { Ingredient } from './IngredientSection/types'

const AddRecipe: React.FunctionComponent = () => {
  const [form, setForm] = useState<AddRecipeForm>(initialValue)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  return (
    <div className={styles.form_wrapper}>
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
          title
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
        <IngredientSection
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </div>
    </div>
  )
}

export default AddRecipe
