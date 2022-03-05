import React, {useState} from 'react'
import styles from './Login.module.scss'
import Input from '../../Input'
import Button from '../../Button'

interface LoginForm {
  username: string
  password: string
}

interface LoginProps {
  hide: boolean
}

const Login: React.FunctionComponent<LoginProps> = ({hide}) => {
  const [credentials, setCredentials] = useState<LoginForm>({
    username: '',
    password: '',
  })
  return (
    <form className={hide ? styles.hidden : styles.loginWrapper} onSubmit={(e) => {
      e.preventDefault()
      console.log(credentials)
    }}>
      <Input
        name='Username/Email'
        id='loginUsername'
        placeholder='Username or Email'
        type='input'
        value={credentials.username}
        setValue={(newVal: string) => setCredentials({...credentials, username: newVal})}
      />
      <Input
        name='Password'
        id='loginPassword'
        placeholder='Password'
        type='password'
        value={credentials.password}
        setValue={(newVal: string) => setCredentials({...credentials, password: newVal})}
      />
      <div className={styles.submitWrapper}>
        <Button label="Submit" type="submit" />
      </div>
    </form>
  )
}

export default Login
