import React, { useState } from 'react'
import styles from '../Login/Login.module.scss'
import Input from '../../Input'
import { initialValue, SignupForm } from './type'
import { preSignupSubmit } from '../../../utils/Client'
import { isPrismaFailure, signUp } from '../../../API/auth/signUp'
import { useRouter } from 'next/router'
import Button from '../../Button'
interface SignupProps {
  hide: boolean
}

const Signup: React.FunctionComponent<SignupProps> = ({ hide }) => {
  const [credentials, setCredentials] = useState<SignupForm>(initialValue)
  const [disabled, setDisabled] = useState<boolean>(false)
  const router = useRouter()
  return (
    <form
      className={hide ? styles.hidden : styles.loginWrapper}
      onSubmit={async (e) => {
        e.preventDefault()
        if (!preSignupSubmit(credentials, setCredentials)) return
        setDisabled(true)
        // noinspection JSUnusedLocalSymbols
        const [response, error] = await signUp({
          email: credentials.email.value,
          username: credentials.username.value,
          password: credentials.password.value,
          firstName: credentials.firstName.value,
          lastName: credentials.lastName.value,
        })
        setDisabled(false)
        if (error === undefined) {
          await router.reload()
          return
        }
        const newCredentials: SignupForm = { ...credentials }
        const errorData = error.response.data
        if (!isPrismaFailure(errorData)) return
        if (error.response.data.prismaCode === 'P2002') {
          newCredentials[errorData.field].error = true
          newCredentials[
            errorData.field
          ].message = `A user already exists with this ${errorData.field}`
        }
        setCredentials(newCredentials)
      }}
    >
      <Input
        name="Email"
        id="email"
        placeholder="Email"
        type="input"
        error={credentials.email.error}
        value={credentials.email.value}
        setValue={(newVal: string) => {
          const newCredentials = { ...credentials }
          newCredentials.email.value = newVal
          setCredentials(newCredentials)
        }}
        onBlur={() => {
          const newCredentials = { ...credentials }
          newCredentials.email.error = false
          setCredentials(newCredentials)
        }}
        message={credentials.email.message}
      />
      <Input
        name="Username"
        id="username"
        placeholder="Username"
        type="input"
        error={credentials.username.error}
        value={credentials.username.value}
        setValue={(newVal: string) => {
          const newCredentials = { ...credentials }
          newCredentials.username.value = newVal
          setCredentials(newCredentials)
        }}
        onBlur={() => {
          const newCredentials = { ...credentials }
          newCredentials.username.error = false
          setCredentials(newCredentials)
        }}
        message={credentials.username.message}
      />
      <Input
        name="Password"
        id="password"
        placeholder="Password"
        type="password"
        error={credentials.password.error}
        value={credentials.password.value}
        setValue={(newVal: string) => {
          const newCredentials = { ...credentials }
          newCredentials.password.value = newVal
          setCredentials(newCredentials)
        }}
        onBlur={() => {
          const newCredentials = { ...credentials }
          newCredentials.password.error = false
          setCredentials(newCredentials)
        }}
        message={credentials.password.message}
      />
      <Input
        name="Confirm Password"
        id="confirmedPassword"
        placeholder="Confirm Password"
        type="password"
        error={credentials.confirmedPassword.error}
        value={credentials.confirmedPassword.value}
        setValue={(newVal: string) => {
          const newCredentials = { ...credentials }
          newCredentials.confirmedPassword.value = newVal
          setCredentials(newCredentials)
        }}
        onBlur={() => {
          const newCredentials = { ...credentials }
          if (
            credentials.password.value !== credentials.confirmedPassword.value
          ) {
            newCredentials.confirmedPassword.error = true
            newCredentials.confirmedPassword.message = 'Passwords do not match'
          } else {
            newCredentials.confirmedPassword.error = false
            newCredentials.confirmedPassword.message = ''
          }
          setCredentials(newCredentials)
        }}
        message={credentials.confirmedPassword.message}
      />
      <Input
        name="First Name"
        id="firstName"
        placeholder="First Name"
        type="input"
        error={credentials.firstName.error}
        value={credentials.firstName.value}
        setValue={(newVal: string) => {
          const newCredentials = { ...credentials }
          newCredentials.firstName.value = newVal
          setCredentials(newCredentials)
        }}
        onBlur={() => {
          const newCredentials = { ...credentials }
          newCredentials.firstName.error = false
          setCredentials(newCredentials)
        }}
        message={credentials.firstName.message}
      />
      <Input
        name="Last Name"
        id="lastName"
        placeholder="Last Name"
        type="input"
        error={credentials.lastName.error}
        value={credentials.lastName.value}
        setValue={(newVal: string) => {
          const newCredentials = { ...credentials }
          newCredentials.lastName.value = newVal
          setCredentials(newCredentials)
        }}
        onBlur={() => {
          const newCredentials = { ...credentials }
          newCredentials.lastName.error = false
          setCredentials(newCredentials)
        }}
        message={credentials.lastName.message}
      />
      <div className={styles.submitWrapper}>
        <Button
          label="Submit"
          type="submit"
          disabled={disabled}
          style="primary"
          name="Sign Up"
        />
      </div>
    </form>
  )
}

export default Signup
