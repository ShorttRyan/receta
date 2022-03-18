import React from 'react'
import { Ingredient } from '../types'

const IngredientComponent: React.FunctionComponent<Ingredient> = ({
  name,
  amount,
}) => {
  return (
    <div>
      <div>{name}</div>
      <div>{amount}</div>
    </div>
  )
}

export default IngredientComponent
