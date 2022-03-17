import { FormInput } from '../../../components/Input/type'

export interface AddRecipeForm {
  title: FormInput<string>
  timeToComplete: FormInput<number>
}

export const initialValue: AddRecipeForm = {
  title: {
    value: '',
    required: true,
    error: false,
    message: '',
  },
  timeToComplete: {
    value: 0,
    required: true,
    error: false,
    message: '',
  },
}
