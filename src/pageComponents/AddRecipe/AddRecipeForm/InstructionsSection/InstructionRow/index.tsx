import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from './InstructionRow.module.scss'

/* Types */
import { InstructionRowProps } from './types'

/* Child Components */
import IconButton from '../../../../../components/IconButton'
import { FiEdit, FiMinus, FiPlus, FiSave } from 'react-icons/fi'

const InstructionRow: React.FunctionComponent<InstructionRowProps> = ({
  index,
  editingIndex,
  isLast,
  value,
  onChange,
  onAdd,
  onRemove,
  startEditing,
  stopEditing,
}) => {
  const isEditingThisEntry: boolean = index === editingIndex
  const isEditing: boolean = editingIndex !== -1
  const activeSection: boolean = isEditing ? isEditingThisEntry : isLast
  const showEdit: boolean = !isLast && !isEditingThisEntry
  const showRemove: boolean = !isLast
  return (
    <tr>
      <td
        className={`${styles.col_index} ${
          isLast && isEditing && styles.disabled
        }`}
      >
        {index + 1}
      </td>
      <td className={styles.col_instruction}>
        <div
          className={`${styles.ellipses} ${!activeSection && styles.disabled}`}
        >
          ...
        </div>
        <TextareaAutosize
          minRows={1}
          className={`${styles.textarea} ${!activeSection && styles.disabled}`}
          name={'instruction number ' + index}
          value={value}
          disabled={!activeSection}
          onChange={(e) => onChange(e.target.value)}
          inputMode="text"
        />
      </td>
      <td className={styles.col_button_1}>
        <div className={styles.button_wrapper}>
          {isEditingThisEntry && (
            <IconButton
              Icon={FiSave}
              onClick={() => stopEditing()}
              disabled={value === ''}
              size="small"
              style="primary"
              name="Save Instruction"
            />
          )}
          {showEdit && (
            <IconButton
              Icon={FiEdit}
              onClick={() => startEditing()}
              disabled={isEditing}
              size="small"
              style="primary"
              name="Edit Instruction"
            />
          )}
        </div>
      </td>
      <td className={styles.controls}>
        <div className={styles.button_wrapper}>
          {isLast && (
            <IconButton
              Icon={FiPlus}
              onClick={() => onAdd()}
              disabled={value === '' || isEditing}
              size="small"
              style="primary"
              name="Add Instruction"
            />
          )}
          {showRemove && (
            <IconButton
              Icon={FiMinus}
              onClick={() => onRemove()}
              disabled={isEditing}
              size="small"
              style="danger"
              name="Remove Instruction"
            />
          )}
        </div>
      </td>
    </tr>
  )
}

export default InstructionRow
