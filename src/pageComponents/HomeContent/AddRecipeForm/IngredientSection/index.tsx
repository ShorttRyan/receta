import React, { useState } from 'react'
import { Ingredient } from './types'
import IngredientComponent from './IngredientComponent'
import styles from './IngredientsSection.module.scss'

interface IngredientSectionProps {
  ingredients: Ingredient[]
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientSection: React.FunctionComponent<IngredientSectionProps> = ({
  ingredients,
  setIngredients,
}) => {
  const [editing, setEditing] = useState<number>(-1)
  return (
    <form
      className={styles.section_wrapper}
      onSubmit={(e) => {
        e.preventDefault()
        console.log('hello there')
      }}
    >
      <div className={styles.section_title}>Ingredients</div>
      <div className={styles.list_wrapper}>
        {ingredients.length > 0 && (
          <table className={styles.list}>
            <tr>
              <th className={styles.title}>Name</th>
              <th className={styles.title}>Amount</th>
              <th className={styles.title}>Unit</th>
            </tr>
            {ingredients.map(({ name, amount, unit }, index) => (
              <IngredientComponent
                key={index}
                name={name}
                amount={amount}
                unit={unit}
                onNameChange={(newVal) => {
                  const newIngredients = [...ingredients]
                  newIngredients[index].name = newVal
                  setIngredients(newIngredients)
                }}
                onAmountChange={(newVal) => {
                  const newIngredients = [...ingredients]
                  newIngredients[index].amount = newVal
                  setIngredients(newIngredients)
                }}
                onUnitChange={(newVal) => {
                  const newIngredients = [...ingredients]
                  newIngredients[index].unit = newVal
                  setIngredients(newIngredients)
                }}
                onAdd={() => {
                  setIngredients([
                    ...ingredients,
                    { name: '', amount: '', unit: '' },
                  ])
                }}
                isLast={index === ingredients.length - 1}
                isEditing={index === editing}
                startEditing={() => setEditing(index)}
                stopEditing={() => setEditing(-1)}
              />
            ))}
          </table>
        )}
      </div>
    </form>
  )
}

export default IngredientSection
