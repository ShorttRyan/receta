import React from 'react'
import styles from './NavBar.module.scss'
import NavLink from './NavLink'
import Link from 'next/link'
import Horizontal from '../Logos/Horizontal'
import ChefHat from '../Logos/ChefHat'

const NavBar: React.FunctionComponent = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarContent}>
        <Link href={'/'} prefetch={false}>
          <a>
            <Horizontal />
          </a>
        </Link>
        <Link href={'/profile'}>
          <a aria-label="Profile Page Link">
            <NavLink icon={<ChefHat />} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
