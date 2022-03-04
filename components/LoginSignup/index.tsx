import React, {useState} from 'react'
import styles from './LoginSignup.module.scss'
import Signup from './Signup'
import Login from './Login'
import Button from '../Button'

const LoginSignup: React.FunctionComponent = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true)
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <div className={styles.title}>
            Receta
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonWrapper}>
              <Button
                onClick={() => setShowLogin(true)}
                label='Log In'
                muted={!showLogin}
              />
              <Button
                onClick={() => setShowLogin(false)}
                label='Sign Up'
                muted={showLogin}
              />
            </div>
          </div>
        </div>
        <div className={styles.loginSignup}>
          {showLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
