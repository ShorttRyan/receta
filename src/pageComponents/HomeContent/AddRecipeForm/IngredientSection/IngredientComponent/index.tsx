import React from 'react'
import styles from './IngredientComponent.module.scss'
import DropDown from '../../../../../components/DropDown'
import { Units } from '../types'
import IconButton from '../../../../../components/IconButton'
import { FiEdit, FiSave, FiPlus } from 'react-icons/fi'
import { getUnit } from './getUnit'

interface IngredientCompProps {
  name: string
  onNameChange: (newVal: string) => void
  amount: string
  onAmountChange: (newVal: string) => void
  unit: string
  onUnitChange: (newVal: string) => void
  onAdd: () => void
  isLast: boolean
  editingIndex: number
  index: number
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
  editingIndex,
  index,
  startEditing,
  stopEditing,
}) => {
  const isEditingThisEntry: boolean = index === editingIndex
  const isEditing: boolean = editingIndex !== -1
  const activeSection: boolean = isEditing ? isEditingThisEntry : isLast
  const showEdit: boolean = !isLast && !isEditingThisEntry
  if (isLast && isEditing) {
    return <></>
  }
  return (
    <tr className={styles.row}>
      <td className={styles.name}>
        <input
          className={`${styles.input} ${
            !activeSection && styles.disabledInput
          }`}
          name="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          disabled={!activeSection}
        />
      </td>
      <td className={styles.amount}>
        <input
          className={`${styles.input} ${
            !activeSection && styles.disabledInput
          }`}
          name="amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={!activeSection}
        />
      </td>
      <td className={styles.unit}>
        <div className={styles.content}>
          {activeSection ? (
            <DropDown
              value={unit}
              options={Units}
              onChange={(newVal) => onUnitChange(newVal)}
            />
          ) : (
            <div className={styles.disabledColor}>{getUnit(unit, amount)}</div>
          )}
        </div>
      </td>
      <td>
        {isLast && (
          <IconButton
            Icon={FiPlus}
            onClick={() => onAdd()}
            disabled={name === '' || amount === '' || isEditing}
          />
        )}
        {isEditingThisEntry && (
          <IconButton
            Icon={FiSave}
            onClick={() => stopEditing()}
            disabled={name === '' || amount === ''}
          />
        )}
        {showEdit && (
          <IconButton
            Icon={FiEdit}
            onClick={() => startEditing()}
            disabled={isEditing}
          />
        )}
      </td>
    </tr>
  )
}

export default IngredientComponent
