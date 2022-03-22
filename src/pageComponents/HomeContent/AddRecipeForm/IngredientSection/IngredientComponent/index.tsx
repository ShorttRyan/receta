import React from 'react'
import styles from './IngredientComponent.module.scss'
import DropDown from '../../../../../components/DropDown'
import { Units } from '../types'
import IconButton from '../../../../../components/IconButton'
import { FiEdit, FiSave, FiPlus, FiMinus } from 'react-icons/fi'
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
  onRemove: () => void
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
  onRemove,
}) => {
  const isEditingThisEntry: boolean = index === editingIndex
  const isEditing: boolean = editingIndex !== -1
  const activeSection: boolean = isEditing ? isEditingThisEntry : isLast
  const showEdit: boolean = !isLast && !isEditingThisEntry
  const showRemove: boolean = !isLast
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
      <td className={styles.controls}>
        {isLast && (
          <IconButton
            Icon={FiPlus}
            onClick={() => onAdd()}
            disabled={name === '' || amount === '' || isEditing}
            size="sm"
          />
        )}
        {showRemove && (
          <IconButton
            Icon={FiMinus}
            onClick={() => onRemove()}
            disabled={isEditing}
            size="sm"
            style="danger"
          />
        )}
        {isEditingThisEntry && (
          <IconButton
            Icon={FiSave}
            onClick={() => stopEditing()}
            disabled={name === '' || amount === ''}
            size="sm"
          />
        )}
        {showEdit && (
          <IconButton
            Icon={FiEdit}
            onClick={() => startEditing()}
            disabled={isEditing}
            size="sm"
          />
        )}
      </td>
    </tr>
  )
}

export default IngredientComponent
