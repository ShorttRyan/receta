import React, {useState} from 'react'
import styles from '../Login/Login.module.scss'
import Input from '../../Input'
import Button from '../../Button'

interface SignUpForm {
  email: string
  username: string
  password: string
  confirmedPassword: string
  firstName: string
  lastName: string
}

interface SignupProps {
  hide: boolean
}

const Signup: React.FunctionComponent<SignupProps> = ({hide}) => {
  const [credentials, setCredentials] = useState<SignUpForm>(
    {
      email: '',
      username: '',
      password: '',
      confirmedPassword: '',
      firstName: '',
      lastName: '',
    }
  )
  return (
    <form className={hide ? styles.hidden : styles.loginWrapper} onSubmit={(e) => {
      e.preventDefault()
      console.log(credentials)
    }}>
      <Input
        name='Email'
        id='email'
        placeholder='Email'
        type='input'
        value={credentials.email}
        setValue={(newVal: string) => setCredentials({...credentials, email: newVal})}
      />
      <Input
        name='Username'
        id='username'
        placeholder='Username'
        type='input'
        value={credentials.username}
        setValue={(newVal: string) => setCredentials({...credentials, username: newVal})}
      />
      <Input
        name='Password'
        id='Password'
        placeholder='Password'
        type='password'
        value={credentials.password}
        setValue={(newVal: string) => setCredentials({...credentials, password: newVal})}
      />
      <Input
        name='Confirm Password'
        id='Password2'
        placeholder='Confirm Password'
        type='password'
        value={credentials.confirmedPassword}
        setValue={(newVal: string) => setCredentials({...credentials, confirmedPassword: newVal})}
      />
      <Input
        name='First Name'
        id='firstName'
        placeholder='First Name'
        type='input'
        value={credentials.firstName}
        setValue={(newVal: string) => setCredentials({...credentials, firstName: newVal})}
      />
      <Input
        name='Last Name'
        id='lastName'
        placeholder='Last Name'
        type='input'
        value={credentials.lastName}
        setValue={(newVal: string) => setCredentials({...credentials, lastName: newVal})}
      />
      <div className={styles.submitWrapper}>
        <Button label="Submit" type="submit" />
      </div>
    </form>
  )
}

export default Signup
