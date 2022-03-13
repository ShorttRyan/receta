import { CustomForm, FormHandler } from './types'

export const checkRequired: FormHandler<CustomForm> = (form: CustomForm) => {
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
