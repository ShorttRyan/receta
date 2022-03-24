import { FormInput } from '../../../components/Input/type'
import { Ingredient } from './IngredientSection/types'
import { uuid } from '../../../utils'
import { Instruction } from './InstructionsSection/types'

export interface AddRecipeForm {
  title: FormInput<string>
  timeToComplete: FormInput<number>
  ingredients: FormInput<Ingredient[]>
  instructions: FormInput<Instruction[]>
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
  ingredients: {
    value: [{ name: '', amount: '', unit: 'N/A', id: uuid() }],
    required: true,
    error: false,
    message: '',
  },
  instructions: {
    value: [{ value: '', id: uuid() }],
    required: true,
    error: false,
    message: '',
  },
}
