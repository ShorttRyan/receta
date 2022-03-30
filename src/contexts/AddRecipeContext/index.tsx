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
import { Recipe } from '@prisma/client'
import { JsonObject } from 'type-fest'

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
  recipeId?: string
}

export const AddRecipeContext = React.createContext({} as AddRecipeInterface)

export interface AddRecipeProviderProps {
  seedRecipe?: Recipe
}

export const AddRecipeProvider: React.FunctionComponent<
  AddRecipeProviderProps
> = ({ children, seedRecipe }) => {
  const [addingRecipe, setAddingRecipe] = useState<boolean>(false)
  const seedForm = { ...initialValue }
  let seedHours = 0
  let seedMinutes = 0
  if (seedRecipe) {
    const instructions = seedRecipe?.instructions as JsonObject[]
    const mappedInstructions: Instruction[] = instructions.map(
      ({ value, id }) => ({
        value: value as string,
        id: id as string,
      }),
    )
    const notes = seedRecipe?.instructions as JsonObject[]
    const mappedNotes: Note[] = notes.map(({ value, id }) => ({
      value: value as string,
      id: id as string,
    }))
    const ingredients = seedRecipe?.ingredients as JsonObject[]
    const mappedIngredients: Ingredient[] = ingredients.map(
      ({ name, amount, unit, id }) => ({
        name: name as string,
        amount: amount as string,
        unit: unit as string,
        id: id as string,
      }),
    )
    seedForm.title.value = seedRecipe.title
    seedForm.private.value = seedRecipe.isPrivate
    seedForm.instructions.value = [
      ...mappedInstructions,
      { value: '', id: uuid() },
    ]
    seedForm.notes.value = [...mappedNotes, { value: '', id: uuid() }]
    seedForm.ingredients.value = [
      ...mappedIngredients,
      { name: '', amount: '', unit: 'N/A', id: uuid() },
    ]
    seedHours = Math.floor(seedRecipe.timeToComplete / 60)
    seedMinutes = seedRecipe.timeToComplete % 60
  }
  const [form, setForm] = useState<AddRecipeForm>(seedForm)
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
  const [hours, setHours] = useState<number>(seedHours)
  const [minutes, setMinutes] = useState<number>(seedMinutes)

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
        recipeId: seedRecipe?.id,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  )
}
