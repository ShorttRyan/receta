import { FormInput } from '../../../../components/Input/type'

export interface AddIngredientForm {
  name: FormInput<string>
  amount: FormInput<number | null>
  unit: FormInput<Unit | null>
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
  unit: Unit
}

export enum Unit {
  Cups = 'Cups',
  Tbs = 'Tbs',
  Tsp = 'Tsp',
  Mg = 'mg',
  G = 'g',
  Kg = 'Kg',
  ml = 'ml',
  L = 'L',
  Oz = 'Oz',
}
