export type InstructionRowProps = {
  value: string
  isLast: boolean
  editingIndex: number
  index: number
  onChange: (newVal: string) => void
  onAdd: () => void
  startEditing: () => void
  stopEditing: () => void
  onRemove: () => void
}
