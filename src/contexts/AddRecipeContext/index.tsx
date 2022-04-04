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
  description: string
  setDescription: (newDescription: string) => void
  ingredients: Ingredient[]
  setIngredients: (newIngredients: Ingredient[]) => void
  instructions: Instruction[]
  setInstructions: (newInstructions: Instruction[]) => void
  notes: Note[]
  setNotes: (newNotes: Note[]) => void
  isPrivate: boolean
  setIsPrivate: (newVal: boolean) => void
  recipeId?: string
}

export const AddRecipeContext = React.createContext({} as AddRecipeInterface)

export interface AddRecipeProviderProps {
  seedForm?: AddRecipeForm
  recipeId?: string
}

export const AddRecipeProvider: React.FunctionComponent<
  AddRecipeProviderProps
> = ({ children, seedForm, recipeId }) => {
  const [addingRecipe, setAddingRecipe] = useState<boolean>(false)
  const seedHours = seedForm
    ? Math.floor(seedForm.timeToComplete.value / 60)
    : 0
  const seedMinutes = seedForm ? seedForm.timeToComplete.value % 60 : 0
  const [form, setForm] = useState<AddRecipeForm>(
    seedForm ? seedForm : initialValue,
  )
  const resetForm = useCallback(
    () =>
      setForm({
        title: { value: '', error: false, required: true, message: '' },
        timeToComplete: { value: 0, error: false, required: true, message: '' },
        description: { value: '', error: false, required: true, message: '' },
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
  const [hours, setHours] = useState<number>(seedHours)
  const [minutes, setMinutes] = useState<number>(seedMinutes)

  const title = form.title.value
  const setTitle = (newTitle: string) => {
    const newForm = { ...form }
    newForm.title.value = newTitle
    setForm(newForm)
  }

  const timeToComplete = hours * 60 + minutes

  const description = form.description.value
  const setDescription = (newDescription: string) => {
    const newForm = { ...form }
    newForm.description.value = newDescription
    setForm(newForm)
  }

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
        description,
        setDescription,
        ingredients,
        setIngredients,
        instructions,
        setInstructions,
        notes,
        setNotes,
        isPrivate,
        setIsPrivate,
        recipeId,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  )
}
