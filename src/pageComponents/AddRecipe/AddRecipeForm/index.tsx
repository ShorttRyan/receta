import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize'
import sharedStyles from './InstructionsSection/InstructionRow/InstructionRow.module.scss'
import styles from './AddRecipeForm.module.scss'

/* Child Components */
import Input from '../../../components/Input'
import Timer from './Timer'
import IngredientSection from './IngredientSection'
import InstructionSection from './InstructionsSection'
import IconButton from '../../../components/IconButton'
import { FiSave, FiUploadCloud, FiArrowLeft, FiTrash2 } from 'react-icons/fi'
import NotesSection from './NotesSection'
import IsPrivateSection from './IsPrivateSection'

/* API */
import { addRecipe, deleteRecipe, updateRecipe } from '../../../API'

/* Contexts */
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
    recipeId,
    description,
    setDescription,
  } = useContext(AddRecipeContext)
  const { setAllRecipes } = useContext(UserDataContext)
  const [disabledNav, setDisableNav] = useState<boolean>(false)
  const router = useRouter()
  return (
    <div className={styles.form_wrapper}>
      <div className={styles.controls}>
        <div className={styles.delete_buttons_wrapper}>
          <IconButton
            onClick={async () => {
              if (!recipeId) {
                setAddingRecipe(false)
              } else {
                await router.push(`/recipe/${recipeId}`)
              }
            }}
            Icon={FiArrowLeft}
            disabled={disabledNav}
            style="danger"
            size="medium"
            name="Save and Exit"
          />
          {recipeId && (
            <div className={styles.trash_button}>
              <IconButton
                onClick={async () => {
                  setDisableNav(true)
                  const [response, error] = await deleteRecipe(recipeId)
                  if (error) {
                    setDisableNav(false)
                  } else {
                    await router.prefetch(`/`)
                    await router.push('/')
                  }
                }}
                Icon={FiTrash2}
                disabled={disabledNav}
                style="danger"
                size="medium"
                name={'Delete Recipe'}
              />
            </div>
          )}
        </div>
        <div className={styles.save_buttons_wrapper}>
          <div className={styles.save_button}>
            <IconButton
              onClick={async () => {
                setDisableNav(true)
                const recipe = {
                  title,
                  timeToComplete: hours * 60 + minutes,
                  description,
                  ingredients: [...ingredients].slice(0, -1),
                  instructions: [...instructions].slice(0, -1),
                  notes: [...notes].slice(0, -1),
                  isPrivate,
                  isDraft: true,
                }
                if (!recipeId) {
                  const [userRecipes, error] = await addRecipe(recipe)
                  if (userRecipes !== undefined) {
                    setAllRecipes(userRecipes?.data)
                    resetForm()
                    setHours(0)
                    setMinutes(0)
                    setAddingRecipe(false)
                  }
                } else {
                  const [response, error] = await updateRecipe(recipe, recipeId)
                  if (!error) {
                    await router.prefetch(`/recipe/${recipeId}`)
                    await router.push(`/recipe/${recipeId}`)
                  }
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
                const newForm = { ...form }
                const recipe = {
                  title,
                  timeToComplete: hours * 60 + minutes,
                  description,
                  ingredients: [...ingredients].slice(0, -1),
                  instructions: [...instructions].slice(0, -1),
                  notes: [...notes].slice(0, -1),
                  isPrivate,
                  isDraft: false,
                }
                if (!(title.length > 0)) {
                  newForm.title.error = true
                  newForm.title.message = 'This field can not be left blank.'
                  setForm(newForm)
                } else {
                  if (!recipeId) {
                    const [userRecipes, error] = await addRecipe(recipe)
                    if (userRecipes !== undefined) {
                      setAllRecipes(userRecipes.data)
                      resetForm()
                      setHours(0)
                      setMinutes(0)
                      setAddingRecipe(false)
                    }
                  } else {
                    const [response, error] = await updateRecipe(
                      recipe,
                      recipeId,
                    )
                    if (!error) {
                      await router.prefetch(`/recipe/${recipeId}`)
                      await router.push(`/recipe/${recipeId}`)
                    }
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
        <div className={styles.description_wrapper}>
          <div className={styles.input_name}>Description</div>
          <TextareaAutosize
            minRows={1}
            className={sharedStyles.textarea}
            name={'recipe description'}
            value={description}
            disabled={false}
            onChange={(e) => setDescription(e.target.value)}
            inputMode="text"
          />
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
