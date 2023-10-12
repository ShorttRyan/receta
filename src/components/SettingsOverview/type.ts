import { FormInput } from '../Input/type'
export type UpdateProfileForm = {
  firstName: FormInput<string>
  lastName: FormInput<string>
  email: FormInput<string>
}
