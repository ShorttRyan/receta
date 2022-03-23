import React, { useState } from 'react'
import { AddIngredientForm, Ingredient, initialValue, Units } from './types'
import IngredientComponent from './IngredientComponent'
import styles from './IngredientsSection.module.scss'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { getUnit } from './IngredientComponent/getUnit'

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
    <form
      className={styles.section_wrapper}
      onSubmit={(e) => {
        e.preventDefault()
        if (newIngredient.amount.value !== null) {
          const unit = getUnit(
            newIngredient.unit.value,
            newIngredient.amount.value,
          )
          setIngredients([
            ...ingredients,
            {
              name: newIngredient.name.value,
              amount: newIngredient.amount?.value,
              unit,
            },
          ])
          setNewIngredient({
            name: {
              value: '',
              error: false,
              required: true,
              message: '',
            },
            amount: {
              value: '',
              error: false,
              required: true,
              message: '',
            },
            unit: {
              value: '',
              error: false,
              required: true,
              message: '',
            },
          })
        }
      }}
    >
      <div className={styles.section_title}>Ingredients</div>
      <div className={styles.add_ingredient_wrapper}>
        <div className={styles.name_amount_wrapper}>
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
        <div className={styles.unit_container}>
          <div className={styles.unit_wrapper}>
            {Units.map((unit) => (
              <Button
                key={unit}
                type="button"
                label={unit}
                style={
                  newIngredient.unit.value === unit
                    ? 'option_selected'
                    : 'option_unselected'
                }
                onClick={() => {
                  const ing = { ...newIngredient }
                  ing.unit.value = unit
                  setNewIngredient(ing)
                }}
              />
            ))}
          </div>
          <div className={styles.extraButtons}>
            <Button
              key="unitless"
              type="button"
              style="danger"
              label="Clear Unit"
              onClick={() => {
                const ing = { ...newIngredient }
                ing.unit.value = ''
                setNewIngredient(ing)
              }}
            />
            <Button
              label="Add Ingredient"
              type="submit"
              style="primary"
              disabled={
                newIngredient.name.value.length === 0 ||
                newIngredient?.amount.value.length === 0
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.list_wrapper}>
        {ingredients.length > 0 && (
          <table className={styles.list}>
            <tr>
              <th className={styles.title}>Name</th>
              <th className={styles.title}>Amount</th>
            </tr>
            {ingredients.map(({ name, amount, unit }, index) => (
              <IngredientComponent
                key={index.toString() + name}
                name={name}
                amount={amount}
                unit={unit}
              />
            ))}
          </table>
        )}
      </div>
    </form>
  )
}

export default IngredientSection
