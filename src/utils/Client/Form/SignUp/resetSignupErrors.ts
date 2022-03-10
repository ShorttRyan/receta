import { FormFunction } from '../types'
import { SignupForm } from '../../../../components/LoginSignup/Signup/type'

export const resetSignupErrors: FormFunction<SignupForm, SignupForm> = (
  form,
  setForm,
) => {
  let key: keyof typeof form
  const newForm = { ...form }
  for (key in form) {
    newForm[key].error = false
  }
  setForm(newForm)
  return newForm
}
