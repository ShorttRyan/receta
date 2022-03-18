import React from 'react'
import { Ingredient } from '../types'

const IngredientComponent: React.FunctionComponent<Ingredient> = ({
  name,
  amount,
  unit,
}) => {
  return (
    <div>
      <div>{name}</div>
      <div>{amount}</div>
      <div>{unit}</div>
    </div>
  )
}

export default IngredientComponent
