import { FormFunction, FormHandler } from '../types'
import { SignupForm } from '../../../../components/LoginSignup/Signup/type'
import { email } from '../../../regex'

export const preSignupSubmit: FormFunction<SignupForm, boolean> = (
  credentials,
  setCredentials,
) => {
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
  setCredentials(newCredentials)
  return status
}

const checkRequired: FormHandler<SignupForm> = (form: SignupForm) => {
  const newForm = { ...form }
  let status = true
  let key: keyof typeof form
  for (key in form) {
    if (form[key].required) {
      switch (typeof form[key].value) {
        case 'string':
          if (form[key].value === '') {
            newForm[key].error = true
            newForm[key].message = 'Field can not be left blank'
            status = false
          } else {
            newForm[key].error = false
            newForm[key].message = ''
          }
          break
        case 'boolean':
          break
        default:
          if (form[key].value !== undefined) {
            newForm[key].error = true
            newForm[key].message = 'Field can not be left blank'
            status = false
          } else {
            newForm[key].error = false
            newForm[key].message = ''
          }
          break
      }
    }
  }
  return [newForm, status]
}
