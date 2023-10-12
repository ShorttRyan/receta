import { FormInput } from '../../Input/type'

export type LoginForm = {
  username: FormInput<string>
  password: FormInput<string>
}
export const initialValue: LoginForm = {
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
}
