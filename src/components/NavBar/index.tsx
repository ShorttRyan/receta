import React from 'react'
import styles from './NavBar.module.scss'
import NavLink from './NavLink'
import { IoPersonCircleOutline } from 'react-icons/io5'
import Link from 'next/link'

const NavBar: React.FunctionComponent = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarContent}>
        <Link href={'/'}>
          <a>
            <div className={styles.titleWrapper}>🍔 Receta</div>
          </a>
        </Link>
        <Link href={'/profile'}>
          <a>
            <NavLink icon={<IoPersonCircleOutline />} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
