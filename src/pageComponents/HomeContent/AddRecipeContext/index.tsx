import React, { useState } from 'react'
import { Ingredient } from '../AddRecipeForm/IngredientSection/types'
import { AddRecipeForm, initialValue } from '../AddRecipeForm/types'
import { Instruction } from '../AddRecipeForm/InstructionsSection/types'

interface AddRecipeInterface {
  addingRecipe: boolean
  setAddingRecipe: (newState: boolean) => void
  form: AddRecipeForm
  setForm: (newForm: AddRecipeForm) => void
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
}

export const AddRecipeContext = React.createContext({} as AddRecipeInterface)

export const AddRecipeProvider: React.FunctionComponent = ({ children }) => {
  const [addingRecipe, setAddingRecipe] = useState<boolean>(false)
  const [form, setForm] = useState<AddRecipeForm>(initialValue)
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
  return (
    <AddRecipeContext.Provider
      value={{
        addingRecipe,
        setAddingRecipe,
        form,
        setForm,
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
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  )
}
