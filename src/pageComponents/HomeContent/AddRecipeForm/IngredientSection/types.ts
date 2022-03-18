import { FormInput } from '../../../../components/Input/type'

export interface AddIngredientForm {
  name: FormInput<string>
  amount: FormInput<number | null>
  unit: FormInput<string | null>
}

export const initialValue: AddIngredientForm = {
  name: {
    value: '',
    required: true,
    error: false,
    message: '',
  },
  amount: {
    value: null,
    required: true,
    error: false,
    message: '',
  },
  unit: {
    value: null,
    required: true,
    error: false,
    message: '',
  },
}

export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export const Units = ['Cups', 'Tbs', 'Tsp', 'mg', 'g', 'Kg', 'ml', 'L', 'Oz']
