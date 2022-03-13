import { FormInput } from '../Input/type'
export interface UpdateProfileForm {
  firstName: FormInput<string>
  lastName: FormInput<string>
  email: FormInput<string>
}
