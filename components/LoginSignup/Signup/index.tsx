import React from 'react'
import styles from '../Login/Login.module.scss'
import Input from '../../Input'
import Button from '../../Button'

const Signup: React.FunctionComponent = () => {
  return (
    <form className={styles.loginWrapper} onSubmit={(e) => {
      e.preventDefault()
      console.log(e)
      console.log('SUBMITTED')
    }}>
      <Input name='Email' id='email' placeholder='Email' type='input' />
      <Input name='Username' id='username' placeholder='Username' type='input' />
      <Input name='Password' id='Password' placeholder='Password' type='password'/>
      <Input name='Confirm Password' id='Password2' placeholder='Confirm Password' type='password'/>
      <Input name='First Name' id='firstName' placeholder='First Name' type='input' />
      <Input name='Last Name' id='lastName' placeholder='Last Name' type='input' />
      <div className={styles.submitWrapper}>
        <Button label="Submit" type="submit" />
      </div>
    </form>
  )
}

export default Signup
