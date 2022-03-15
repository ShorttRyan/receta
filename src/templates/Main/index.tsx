import React from 'react'
import NavBar from '../../components/NavBar'
import styles from './MainTemplate.module.scss'

const MainTemplate: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.baseDiv}>
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default MainTemplate
