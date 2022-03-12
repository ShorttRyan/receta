import React from 'react'
import NavBar from '../../components/NavBar'
import styles from './MainTemplate.module.scss'

const MainTemplate: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles.baseDiv}>
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </>
  )
}

export default MainTemplate
