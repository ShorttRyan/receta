import React from 'react'
import { FormInput } from '../../../components/Input/type'

export type CustomForm = {
  [key in string]: FormInput<any>
}

export type FormFunction<FormType, Result> = (
  form: FormType,
  setForm: React.Dispatch<React.SetStateAction<FormType>>,
) => Result

export type FormHandler<FormType> = (form: FormType) => [FormType, boolean]
