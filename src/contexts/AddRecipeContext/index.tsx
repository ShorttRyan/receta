import React, { useCallback, useState } from 'react'
import {
  AddRecipeForm,
  initialValue,
} from '../../pageComponents/AddRecipe/AddRecipeForm/types'
import { Ingredient } from '../../pageComponents/AddRecipe/AddRecipeForm/IngredientSection/types'
import {
  Instruction,
  Note,
} from '../../pageComponents/AddRecipe/AddRecipeForm/InstructionsSection/types'
import { uuid } from '../../utils'

interface AddRecipeInterface {
  addingRecipe: boolean
  setAddingRecipe: (newState: boolean) => void
  form: AddRecipeForm
  setForm: (newForm: AddRecipeForm) => void
  resetForm: () => void
  title: string
  setTitle: (newTitle: string) => void
  hours: number
  setHours: (newHours: number) => void
  minutes: number
  setMinutes: (newMinutes: number) => void
  timeToComplete: number
  ingredients: Ingredient[]
  setIngredients: (newIngredients: Ingredient[]) => void
  instructions: Instruction[]
  setInstructions: (newInstructions: Instruction[]) => void
  notes: Note[]
  setNotes: (newNotes: Note[]) => void
  isPrivate: boolean
  setIsPrivate: (newVal: boolean) => void
}

export const AddRecipeContext = React.createContext({} as AddRecipeInterface)

export const AddRecipeProvider: React.FunctionComponent = ({ children }) => {
  const [addingRecipe, setAddingRecipe] = useState<boolean>(false)
  const [form, setForm] = useState<AddRecipeForm>(initialValue)
  const resetForm = useCallback(
    () =>
      setForm({
        title: { value: '', error: false, required: true, message: '' },
        timeToComplete: { value: 0, error: false, required: true, message: '' },
        private: { value: false, error: false, required: true, message: '' },
        ingredients: {
          value: [{ name: '', amount: '', unit: '', id: uuid() }],
          error: false,
          required: true,
          message: '',
        },
        instructions: {
          value: [{ value: '', id: uuid() }],
          error: false,
          required: true,
          message: '',
        },
        notes: {
          value: [{ value: '', id: uuid() }],
          error: false,
          required: true,
          message: '',
        },
      }),
    [],
  )
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)

  const title = form.title.value
  const setTitle = (newTitle: string) => {
    const newForm = { ...form }
    newForm.title.value = newTitle
    setForm(newForm)
  }

  const timeToComplete = hours * 60 + minutes

  const ingredients = form.ingredients.value
  const setIngredients = (newIngredients: Ingredient[]) => {
    const newForm = { ...form }
    newForm.ingredients.value = newIngredients
    setForm(newForm)
  }

  const instructions = form.instructions.value
  const setInstructions = (newInstructions: Instruction[]) => {
    const newForm = { ...form }
    newForm.instructions.value = newInstructions
    setForm(newForm)
  }

  const notes = form.notes.value
  const setNotes = (newNotes: Instruction[]) => {
    const newForm = { ...form }
    newForm.notes.value = newNotes
    setForm(newForm)
  }

  const isPrivate = form.private.value
  const setIsPrivate = (newVal: boolean) => {
    const newForm = { ...form }
    newForm.private.value = newVal
    setForm(newForm)
  }
  return (
    <AddRecipeContext.Provider
      value={{
        addingRecipe,
        setAddingRecipe,
        form,
        setForm,
        resetForm,
        title,
        setTitle,
        hours,
        setHours,
        minutes,
        setMinutes,
        timeToComplete,
        ingredients,
        setIngredients,
        instructions,
        setInstructions,
        notes,
        setNotes,
        isPrivate,
        setIsPrivate,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  )
}
