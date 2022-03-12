import React from 'react'
import styles from './NavBar.module.scss'

const NavBar: React.FunctionComponent = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div>Receta</div>
      <div>My Recipes</div>
      <div>Explore</div>
      <div>Profile</div>
    </div>
  )
}

export default NavBar
