import { FormInput } from '../../Input/type'

export interface LoginForm {
  username: FormInput<string>
  password: FormInput<string>
}
export const initialValue: LoginForm = {
  username: {
    value: '',
    error: false,
  },
  password: {
    value: '',
    error: false,
  },
}
