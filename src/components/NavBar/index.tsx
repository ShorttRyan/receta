import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.scss'

/* Child Components */
import NavLink from './NavLink'
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
        <Link href={'/settings'} replace={true}>
          <a aria-label="Settings Page">
            <NavLink icon={<ChefHat />} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
