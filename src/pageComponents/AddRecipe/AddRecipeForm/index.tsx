import React, { useContext, useState } from 'react'
import styles from './AddRecipeForm.module.scss'
import Input from '../../../components/Input'
import Timer from './Timer'
import IngredientSection from './IngredientSection'
import InstructionSection from './InstructionsSection'
import IconButton from '../../../components/IconButton'
import { FiSave, FiUploadCloud, FiArrowLeft } from 'react-icons/fi'
import NotesSection from './NotesSection'
import IsPrivateSection from './IsPrivateSection'
import { addRecipe } from '../../../API/recipes/addRecipe'
import { AddRecipeContext } from '../../../contexts/AddRecipeContext'
import { UserDataContext } from '../../../contexts/UserDataContext'

const AddRecipe: React.FunctionComponent = () => {
  const {
    form,
    setForm,
    resetForm,
    title,
    setTitle,
    hours,
    setHours,
    minutes,
    setMinutes,
    setAddingRecipe,
    ingredients,
    instructions,
    notes,
    isPrivate,
  } = useContext(AddRecipeContext)
  const { setAllRecipes } = useContext(UserDataContext)
  const [disabledNav, setDisableNav] = useState<boolean>(false)
  return (
    <div className={styles.form_wrapper}>
      <div className={styles.controls}>
        <IconButton
          onClick={() => setAddingRecipe(false)}
          Icon={FiArrowLeft}
          disabled={disabledNav}
          style="danger"
          size="medium"
          name="Save and Exit"
        />
        <div className={styles.save_buttons_wrapper}>
          <div className={styles.save_button}>
            <IconButton
              onClick={async () => {
                setDisableNav(true)
                const trimIngredients = [...ingredients]
                const trimInstructions = [...instructions]
                const trimNotes = [...notes]
                trimIngredients.pop()
                trimInstructions.pop()
                trimNotes.pop()
                const [userRecipes, error] = await addRecipe({
                  title,
                  timeToComplete: hours * 60 + minutes,
                  ingredients,
                  instructions,
                  notes,
                  isPrivate,
                  isDraft: true,
                })
                if (userRecipes !== undefined) {
                  setAllRecipes(userRecipes.data)
                  resetForm()
                  setHours(0)
                  setMinutes(0)
                  setAddingRecipe(false)
                }
                setDisableNav(false)
              }}
              Icon={FiSave}
              disabled={disabledNav}
              style="primary"
              size="medium"
              name="Save and Exit"
            />
          </div>
          <div>
            <IconButton
              onClick={async () => {
                setDisableNav(true)
                const trimIngredients = [...ingredients]
                const trimInstructions = [...instructions]
                const trimNotes = [...notes]
                trimIngredients.pop()
                trimInstructions.pop()
                trimNotes.pop()
                const newForm = { ...form }
                if (!(title.length > 0)) {
                  newForm.title.error = true
                  newForm.title.message = 'This field can not be left blank.'
                  setForm(newForm)
                } else {
                  const [userRecipes, error] = await addRecipe({
                    title,
                    timeToComplete: hours * 60 + minutes,
                    ingredients,
                    instructions,
                    notes,
                    isPrivate,
                    isDraft: false,
                  })
                  if (userRecipes !== undefined) {
                    setAllRecipes(userRecipes.data)
                    resetForm()
                    setHours(0)
                    setMinutes(0)
                    setAddingRecipe(false)
                  }
                }
                setDisableNav(false)
              }}
              Icon={FiUploadCloud}
              disabled={disabledNav}
              style="primary"
              size="medium"
              name="Upload Recipe"
            />
          </div>
        </div>
      </div>
      <div className={styles.section_meta}>
        <Input
          name="Title"
          value={title}
          setValue={setTitle}
          onBlur={() => {
            const newForm = { ...form }
            newForm.title.error = false
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
        <IngredientSection />
        <InstructionSection />
        <NotesSection />
        <IsPrivateSection />
      </div>
    </div>
  )
}

export default AddRecipe
