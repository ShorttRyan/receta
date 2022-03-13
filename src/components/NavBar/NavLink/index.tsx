import React, { ReactElement } from 'react'
import styles from './NavLink.module.scss'

export interface NavLinkProps {
  label?: string
  icon?: ReactElement
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({ label, icon }) => {
  return (
    <div>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      {label && <div>{label}</div>}
    </div>
  )
}

export default NavLink
