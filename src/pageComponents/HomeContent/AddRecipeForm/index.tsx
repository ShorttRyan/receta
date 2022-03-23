import React, { useContext } from 'react'
import styles from './AddRecipeForm.module.scss'
import Input from '../../../components/Input'
import Timer from './Timer'
import IngredientSection from './IngredientSection'
import { AddRecipeContext } from '../AddRecipeContext'

const AddRecipe: React.FunctionComponent = () => {
  const { form, title, setTitle, hours, setHours, minutes, setMinutes } =
    useContext(AddRecipeContext)
  return (
    <form
      className={styles.form_wrapper}
      onSubmit={(e) => {
        e.preventDefault()
        console.log('submitted')
      }}
    >
      <div className={styles.section_meta}>
        <Input
          name="Title"
          value={title}
          setValue={setTitle}
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
        <IngredientSection />
      </div>
    </form>
  )
}

export default AddRecipe
