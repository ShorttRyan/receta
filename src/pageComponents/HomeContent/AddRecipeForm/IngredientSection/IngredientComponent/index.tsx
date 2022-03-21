import React from 'react'
import styles from './IngredientComponent.module.scss'
import DropDown from '../../../../../components/DropDown'
import { Units } from '../types'
import IconButton from '../../../../../components/IconButton'
import { FiEdit, FiSave, FiPlus } from 'react-icons/fi'

interface IngredientCompProps {
  name: string
  onNameChange: (newVal: string) => void
  amount: string
  onAmountChange: (newVal: string) => void
  unit: string
  onUnitChange: (newVal: string) => void
  onAdd: () => void
  isLast: boolean
  isEditing: boolean
  startEditing: () => void
  stopEditing: () => void
}
const IngredientComponent: React.FunctionComponent<IngredientCompProps> = ({
  name,
  amount,
  unit,
  onNameChange,
  onAmountChange,
  onUnitChange,
  onAdd,
  isLast,
  isEditing,
  startEditing,
  stopEditing,
}) => {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>
        <input
          className={`${styles.input} ${!isEditing && styles.disabledInput}`}
          name="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={!isEditing}
        />
      </td>
      <td className={styles.amount}>
        <input
          className={`${styles.input} ${!isEditing && styles.disabledInput}`}
          name="amount"
          value={amount}
          type="number"
          onChange={(e) => onAmountChange(e.target.value)}
          onKeyDown={(e) =>
            ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
          }
          disabled={!isEditing}
        />
      </td>
      <td className={styles.unit}>
        <div className={styles.content}>
          {isLast ? (
            <>
              <DropDown
                value={unit}
                options={Units}
                onChange={(newVal) => onUnitChange(newVal)}
              />
              <IconButton
                Icon={FiPlus}
                onClick={() => onAdd()}
                disabled={name === '' || amount === ''}
              />
            </>
          ) : (
            <>
              {isEditing ? (
                <>
                  <IconButton
                    Icon={FiPlus}
                    onClick={() => onAdd()}
                    disabled={name === '' || amount === ''}
                  />
                  <IconButton
                    Icon={FiSave}
                    onClick={() => stopEditing()}
                    disabled={name === '' || amount === ''}
                  />
                </>
              ) : (
                <>
                  <div className={styles.unitName}>{unit}</div>
                  <IconButton
                    Icon={FiEdit}
                    onClick={() => startEditing()}
                    disabled={false}
                  />
                </>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

export default IngredientComponent
