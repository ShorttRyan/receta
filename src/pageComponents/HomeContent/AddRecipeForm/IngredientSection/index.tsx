import React, { useState } from 'react'
import { AddIngredientForm, Ingredient, initialValue, Units } from './types'
import IngredientComponent from './IngredientComponent'
import styles from './IngredientsSection.module.scss'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import DropDown from '../../../../components/DropDown'

interface IngredientSectionProps {
  ingredients: Ingredient[]
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientSection: React.FunctionComponent<IngredientSectionProps> = ({
  ingredients,
  setIngredients,
}) => {
  const [newIngredient, setNewIngredient] =
    useState<AddIngredientForm>(initialValue)
  return (
    <div className={styles.section_wrapper}>
      <div className={styles.section_title}>Ingredients</div>
      <ul>
        {ingredients.map(({ name, amount, unit }, index) => (
          <IngredientComponent
            key={index.toString() + name}
            name={name}
            amount={amount}
            unit={unit}
          />
        ))}
      </ul>
      <div className={styles.add_ingredient_wrapper}>
        <div className={styles.input_wrapper}>
          <Input
            name="Name"
            value={newIngredient.name.value}
            setValue={(newValue) => {
              const ing = { ...newIngredient }
              ing.name.value = newValue
              setNewIngredient(ing)
            }}
            type="input"
            placeholder="Name"
            id="Name"
            error={newIngredient.name.error}
            message={newIngredient.name.message}
          />
        </div>
        <div className={styles.input_wrapper}>
          <Input
            name="Amount"
            value={newIngredient.amount.value}
            setValue={(newValue) => {
              const ing = { ...newIngredient }
              ing.amount.value = newValue
              setNewIngredient(ing)
            }}
            type="number"
            placeholder="Amount"
            id="Amount"
            error={newIngredient.amount.error}
            message={newIngredient.amount.message}
          />
        </div>
        <DropDown id={'unit'} name={'Unit'} label={'Unit'} options={Units} />
        <Button
          label="+"
          type="button"
          onClick={() => {
            if (
              newIngredient.amount.value !== null &&
              newIngredient.unit.value !== null
            )
              setIngredients([
                ...ingredients,
                {
                  name: newIngredient.name.value,
                  amount: newIngredient.amount?.value,
                  unit: newIngredient.unit?.value,
                },
              ])
          }}
          style="primaryCircle"
          disabled={
            newIngredient.name.value.length === 0 ||
            newIngredient?.amount?.value === null ||
            newIngredient?.unit?.value === null ||
            newIngredient?.amount?.value === 0
          }
        />
      </div>
    </div>
  )
}

export default IngredientSection
