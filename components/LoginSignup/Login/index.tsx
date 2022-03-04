import React from 'react'
import styles from './Login.module.scss'
import Input from '../../Input'
import Button from '../../Button'

const Login: React.FunctionComponent = () => {
  return (
    <form className={styles.loginWrapper} onSubmit={(e) => {
      e.preventDefault()
      console.log('SUBMITTED')
    }}>
      <Input name='Username/Email' id='username' placeholder='Username or Email' type='input' />
      <Input name='Password' id='Password' placeholder='Password' type='password'/>
      <div className={styles.submitWrapper}>
        <Button label="Submit" type="submit" />
      </div>
    </form>
  )
}

export default Login
