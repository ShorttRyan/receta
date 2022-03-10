export type FormInput<InputType> = {
  value: InputType
  error: boolean
  required: boolean
  message?: string
}
