import React from 'react'
import styles from './NavBar.module.scss'
import NavLink from './NavLink'
import Link from 'next/link'
import Horizontal from '../Logos/Horizontal'
import ChefHat from '../Logos/ChefHat'
import { FiCompass } from 'react-icons/fi'

const NavBar: React.FunctionComponent = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarContent}>
        <div className={styles.leftSide}>
          <Link href={'/'} replace={true}>
            <a>
              <Horizontal />
            </a>
          </Link>
          <Link href={'/explore'} replace={true}>
            <a aria-label="Explore Page" className={styles.explore}>
              <FiCompass />
              Explore
            </a>
          </Link>
        </div>
        <Link href={'/profile'} replace={true}>
          <a aria-label="Profile Page">
            <NavLink icon={<ChefHat />} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
