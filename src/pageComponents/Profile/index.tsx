import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './ProfileContent.module.scss'

/* API */
import { logOut } from '../../API'

/* Types */
import { ProfilePageProps } from '../../pages/profile'

/* Child Components */
import Button from '../../components/Button'
import ProfileOverview from '../../components/ProfileOverview'

/* Utils */
import { eraseCookie } from '../../utils/Client/cookie'


const ProfileContent: React.FunctionComponent<ProfilePageProps> = (props) => {
  const [disabled, setDisabled] = useState<boolean>(false)
  const router = useRouter()
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.header}>
        <div className={styles.userTitle}>@{props.username}</div>
        <div className={styles.buttonWrapper}>
          <Button
            label="Sign Out"
            type="button"
            style="danger"
            disabled={disabled}
            onClick={async () => {
              setDisabled(true)
              // noinspection JSUnusedLocalSymbols
              const [response, error] = await logOut()
              if (error === undefined) {
                eraseCookie('auth')
                await router.push('/')
                return
              }
              setDisabled(false)
            }}
            name="Sign Out"
          />
        </div>
      </div>
      <ProfileOverview
        email={props.email}
        firstName={props.firstName}
        lastName={props.lastName}
      />
    </div>
  )
}

export default ProfileContent
