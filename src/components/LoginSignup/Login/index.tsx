import React, { useEffect, useState } from 'react'
import styles from './Login.module.scss'
import Input from '../../Input'
import Button from '../../Button'
import { logIn } from '../../../API/auth'
import { useRouter } from 'next/router'
import { initialValue, LoginForm } from './type'

interface LoginProps {
  hide: boolean
}

const Login: React.FunctionComponent<LoginProps> = ({ hide }) => {
  const [credentials, setCredentials] = useState<LoginForm>(initialValue)
  const router = useRouter()
  useEffect(() => {
    setCredentials({
      username: { value: '', error: false },
      password: { value: '', error: false },
    })
  }, [hide])
  return (
    <form
      className={hide ? styles.hidden : styles.loginWrapper}
      onSubmit={async (e) => {
        e.preventDefault()
        const newCredentials = { ...credentials }
        newCredentials.username.error = false
        newCredentials.password.error = false
        setCredentials(newCredentials)
        const [result, error] = await logIn({
          username: credentials.username.value,
          password: credentials.password.value,
        })
        if (error === undefined) {
          router.push('/')
        } else {
          const newCredentials = { ...credentials }
          newCredentials.username.error = true
          newCredentials.password.error = true
          setCredentials(newCredentials)
        }
      }}
    >
      <Input
        name="Username / Email"
        id="loginUsername"
        placeholder="Username or Email"
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
      />
      <Input
        name="Password"
        id="loginPassword"
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
      />
      <div className={styles.submitWrapper}>
        <Button label="Submit" type="submit" />
      </div>
    </form>
  )
}

export default Login
