import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Login.module.scss'

/* API */
import { logIn } from '../../../API'

/* Types */
import { initialValue, LoginForm } from './type'

/* Child Components */
import Input from '../../Input'
import Button from '../../Button'

type LoginProps = {
  hide: boolean
}

const Login: React.FunctionComponent<LoginProps> = ({ hide }) => {
  const [credentials, setCredentials] = useState<LoginForm>(initialValue)
  const [disabled, setDisabled] = useState<boolean>(false)
  const router = useRouter()
  return (
    <form
      className={hide ? styles.hidden : styles.loginWrapper}
      onSubmit={async (e) => {
        setDisabled(true)
        e.preventDefault()
        const newCredentials = { ...credentials }
        newCredentials.username.error = false
        newCredentials.password.error = false
        setCredentials(newCredentials)
        // noinspection JSUnusedLocalSymbols
        const [result, error] = await logIn({
          username: credentials.username.value,
          password: credentials.password.value,
        })
        if (error === undefined) {
          await router.push((router.query.returnUrl as string) || '/')
        } else {
          const newCredentials = { ...credentials }
          newCredentials.username.error = true
          newCredentials.password.error = true
          setCredentials(newCredentials)
        }
        setDisabled(false)
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
        useShake={true}
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
        useShake={true}
      />
      <div className={styles.submitWrapper}>
        <Button
          label="Submit"
          type="submit"
          disabled={disabled}
          style="primary"
          name="Log in"
        />
      </div>
    </form>
  )
}

export default Login
