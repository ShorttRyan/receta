import React from 'react'
import styles from './ProfileHeader.module.scss'

/* Child Components */
import ChefHat from '../Logos/ChefHat'

type ProfileHeaderProps = {
  firstName: string
  lastName: string
  username: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  username,
}) => {
  return (
    <div className={styles.profile_header_wrapper}>
      <div className={styles.icon_and_name}>
        <ChefHat isStatic />
        <div className={styles.name_label}>
          {firstName} {lastName}
        </div>
      </div>
      <div className={styles.username_label}>@{username}</div>
    </div>
  )
}

export default ProfileHeader
