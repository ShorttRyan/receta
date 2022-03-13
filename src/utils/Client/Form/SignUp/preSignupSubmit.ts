import { FormFunction } from '../types'
import { SignupForm } from '../../../../components/LoginSignup/Signup/type'
import { email } from '../../../regex'
import { checkRequired } from '../checkRequired'

export const preSignupSubmit: FormFunction<SignupForm, boolean> = (
  credentials,
  setCredentials,
) => {
  // @ts-ignore
  let [newCredentials, status] = checkRequired(credentials)
  if (
    credentials.email.value.length > 0 &&
    !email.test(credentials.email.value)
  ) {
    status = false
    newCredentials.email.error = true
    newCredentials.email.message = 'Please enter a valid email address'
  }
  if (credentials.password.value !== credentials.confirmedPassword.value) {
    status = false
    newCredentials.confirmedPassword.error = true
    newCredentials.confirmedPassword.message = 'Passwords do not match'
  }
  if (credentials.username.value.includes(' ')) {
    status = false
    newCredentials.username.error = true
    newCredentials.username.message = 'Username can not contain spaces'
  }
  // @ts-ignore
  setCredentials(newCredentials)
  return status
}
