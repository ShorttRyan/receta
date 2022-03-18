import { FormInput } from '../../../../components/Input/type'

export interface AddIngredientForm {
  name: FormInput<string>
  amount: FormInput<string>
  unit: FormInput<string>
}

export const initialValue: AddIngredientForm = {
  name: {
    value: '',
    required: true,
    error: false,
    message: '',
  },
  amount: {
    value: '',
    required: true,
    error: false,
    message: '',
  },
  unit: {
    value: 'Cup',
    required: true,
    error: false,
    message: '',
  },
}

export interface Ingredient {
  name: string
  amount: string
  unit: string
}

export const Units = ['Cup', 'Tbs', 'Tsp', 'Kg', 'g', 'mg', 'L', 'ml', 'Oz']
