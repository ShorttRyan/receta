import React, { useContext, useState } from 'react'
import SharedStyles from '../IngredientSection/IngredientsSection.module.scss'
import styles from './InstructionsSection.module.scss'

/* Child Components */
import InstructionRow from './InstructionRow'

/* Contexts */
import { AddRecipeContext } from '../../../../contexts/AddRecipeContext'

/* Utils */
import { uuid } from '../../../../utils'

const InstructionSection: React.FunctionComponent = () => {
  const { instructions, setInstructions } = useContext(AddRecipeContext)
  const [editingIndex, setEditing] = useState<number>(-1)
  return (
    <div className={SharedStyles.section_wrapper}>
      <div className={SharedStyles.section_title}>Instructions</div>
      <div className={SharedStyles.list_wrapper}>
        <table className={SharedStyles.list}>
          <tbody>
            <tr>
              <th className={styles.number_title}>#</th>
              <th className={styles.instruction_title}>Instruction</th>
              <th className={styles.control_title} />
              <th className={styles.control_title} />
            </tr>
            {instructions.map((instruction, index) => (
              <InstructionRow
                key={instruction.id}
                value={instruction.value}
                onChange={(newVal) => {
                  const newInstructions = [...instructions]
                  newInstructions[index].value = newVal
                  setInstructions(newInstructions)
                }}
                onAdd={() => {
                  setInstructions([
                    ...instructions,
                    {
                      value: '',
                      id: uuid(),
                    },
                  ])
                }}
                isLast={index === instructions.length - 1}
                editingIndex={editingIndex}
                index={index}
                startEditing={() => setEditing(index)}
                stopEditing={() => setEditing(-1)}
                onRemove={() => {
                  const ingredientsCopy = [...instructions]
                  ingredientsCopy.splice(index, 1)
                  setInstructions(ingredientsCopy)
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InstructionSection
