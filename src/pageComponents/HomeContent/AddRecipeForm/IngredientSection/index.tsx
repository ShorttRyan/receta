import React, { useState } from 'react'
import { Ingredient } from './types'
import IngredientComponent from './IngredientComponent'
import styles from './IngredientsSection.module.scss'
import { uuid } from '../../../../utils'

interface IngredientSectionProps {
  ingredients: Ingredient[]
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientSection: React.FunctionComponent<IngredientSectionProps> = ({
  ingredients,
  setIngredients,
}) => {
  const [editingIndex, setEditing] = useState<number>(-1)
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
            <tbody>
              <tr>
                <th className={styles.title}>Name</th>
                <th className={styles.title}>Amount</th>
                <th className={styles.title}>Unit</th>
                <th className={styles.title} />
              </tr>
              {ingredients.map(({ name, amount, unit, id }, index) => (
                <IngredientComponent
                  key={id}
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
                      {
                        name: '',
                        amount: '',
                        unit: 'N/A',
                        id: uuid(),
                      },
                    ])
                  }}
                  isLast={index === ingredients.length - 1}
                  editingIndex={editingIndex}
                  index={index}
                  startEditing={() => setEditing(index)}
                  stopEditing={() => setEditing(-1)}
                  onRemove={() => {
                    const ingredientsCopy = [...ingredients]
                    ingredientsCopy.splice(index, 1)
                    setIngredients(ingredientsCopy)
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </form>
  )
}

export default IngredientSection
