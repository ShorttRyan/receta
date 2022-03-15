import React from 'react'
import styles from './HomeContent.module.scss'

const HomeContent: React.FunctionComponent = () => {
  return (
    <>
      <div className={styles.subNavWrapper}>
        <div className={styles.subNavLinkWrapper}>
          <button className={styles.subNavLink}>My Recipes</button>
          <button className={styles.subNavLink}>Liked Recipes</button>
        </div>
      </div>
      <div>Home Content</div>
    </>
  )
}

export default HomeContent
