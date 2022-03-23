import React from 'react'
import { Ingredient } from '../types'
import styles from './IngredientComponent.module.scss'

const IngredientComponent: React.FunctionComponent<Ingredient> = ({
  name,
  amount,
  unit,
}) => {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>{name}</td>
      <td className={styles.amount}>{`${amount}${
        unit === '' ? '' : ` ${unit}`
      }`}</td>
    </tr>
  )
}

export default IngredientComponent
