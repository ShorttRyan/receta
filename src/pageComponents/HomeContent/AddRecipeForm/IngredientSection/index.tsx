import React from 'react'
import { Ingredient } from './types'
import IngredientComponent from './IngredientComponent'

interface IngredientSectionProps {
  ingredients: Ingredient[]
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const IngredientSection: React.FunctionComponent<IngredientSectionProps> = ({
  ingredients,
  setIngredients,
}) => {
  return (
    <div>
      <div>Title: Ingredients</div>
      <ul>
        {ingredients.map(({ name, amount, unit }) => (
          <IngredientComponent
            key={name + '-' + amount + '-' + unit}
            name={name}
            amount={amount}
            unit={unit}
          />
        ))}
      </ul>
    </div>
  )
}

export default IngredientSection
