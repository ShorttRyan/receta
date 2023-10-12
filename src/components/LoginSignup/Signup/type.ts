import { FormInput } from '../../Input/type'

export type SignupForm = {
  email: FormInput<string>
  username: FormInput<string>
  password: FormInput<string>
  confirmedPassword: FormInput<string>
  firstName: FormInput<string>
  lastName: FormInput<string>
}
export const initialValue: SignupForm = {
  email: {
    value: '',
    error: false,
    required: true,
  },
  username: {
    value: '',
    error: false,
    required: true,
  },
  password: {
    value: '',
    error: false,
    required: true,
  },
  confirmedPassword: {
    value: '',
    error: false,
    required: true,
  },
  firstName: {
    value: '',
    error: false,
    required: true,
  },
  lastName: {
    value: '',
    error: false,
    required: true,
  },
}
