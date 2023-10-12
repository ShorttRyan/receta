import React, { useContext, useState } from 'react'
import shared from '../IngredientSection/IngredientsSection.module.scss'
import styles from '../InstructionsSection/InstructionsSection.module.scss'

/* Utils */
import { uuid } from '../../../../utils'

/* Child Components */
import InstructionRow from '../InstructionsSection/InstructionRow'

/* Contexts */
import { AddRecipeContext } from '../../../../contexts/AddRecipeContext'

const NotesSection: React.FunctionComponent = () => {
  const { notes, setNotes } = useContext(AddRecipeContext)
  const [editingIndex, setEditing] = useState<number>(-1)
  return (
    <div className={shared.section_wrapper}>
      <div className={shared.section_title}>Additional Notes</div>
      <div className={shared.list_wrapper}>
        <table className={shared.list}>
          <tbody>
            <tr>
              <th className={styles.number_title}>#</th>
              <th className={styles.instruction_title}>Note</th>
              <th className={styles.control_title} />
              <th className={styles.control_title} />
            </tr>
            {notes.map((note, index) => (
              <InstructionRow
                key={note.id}
                value={note.value}
                onChange={(newVal) => {
                  const newInstructions = [...notes]
                  newInstructions[index].value = newVal
                  setNotes(newInstructions)
                }}
                onAdd={() => {
                  setNotes([
                    ...notes,
                    {
                      value: '',
                      id: uuid(),
                    },
                  ])
                }}
                isLast={index === notes.length - 1}
                editingIndex={editingIndex}
                index={index}
                startEditing={() => setEditing(index)}
                stopEditing={() => setEditing(-1)}
                onRemove={() => {
                  const ingredientsCopy = [...notes]
                  ingredientsCopy.splice(index, 1)
                  setNotes(ingredientsCopy)
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NotesSection
