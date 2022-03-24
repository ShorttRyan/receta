import React, { useState } from 'react'
import styles from './LoginSignup.module.scss'
import Signup from './Signup'
import Login from './Login'
import Button from '../Button'
import Stacked from '../Logos/Stacked'

const LoginSignup: React.FunctionComponent = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true)
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <div className={styles.title}>
            <Stacked />
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonWrapper}>
              <Button
                onClick={() => setShowLogin(true)}
                label="Log In"
                muted={!showLogin}
                style="login"
                type="button"
                name="Show Log In Prompt"
              />
              <Button
                onClick={() => setShowLogin(false)}
                label="Sign Up"
                muted={showLogin}
                style="login"
                type="button"
                name="Show Sign Up Prompt"
              />
            </div>
          </div>
        </div>
        <div className={styles.loginSignup}>
          <Login hide={!showLogin} />
          <Signup hide={showLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
