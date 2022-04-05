import { FormInput } from '../../../components/Input/type'
import { Ingredient } from './IngredientSection/types'
import { uuid } from '../../../utils'
import { Instruction, Note } from './InstructionsSection/types'

export interface AddRecipeForm {
  title: FormInput<string>
  timeToComplete: FormInput<number>
  description: FormInput<string>
  ingredients: FormInput<Ingredient[]>
  instructions: FormInput<Instruction[]>
  notes: FormInput<Note[]>
  private: FormInput<boolean>
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
  description: {
    value: '',
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
  notes: {
    value: [{ value: '', id: uuid() }],
    required: true,
    error: false,
    message: '',
  },
  private: {
    value: false,
    required: true,
    error: false,
    message: '',
  },
}
