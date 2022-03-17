import React, { useState } from 'react'
import styles from './ProfileContent.module.scss'
import { ProfilePageProps } from '../../pages/profile'
import Button from '../../components/Button'
import { logOut } from '../../API/auth/logOut'
import { useRouter } from 'next/router'
import ProfileOverview from '../../components/ProfileOverview'

const ProfileContent: React.FunctionComponent<ProfilePageProps> = (props) => {
  const [disabled, setDisabled] = useState<boolean>(false)
  const router = useRouter()
  return (
    <div>
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
              const [response, error] = await logOut()
              if (error === undefined) {
                await router.replace(router.asPath)
                await router.reload()
                return
              }
              setDisabled(false)
            }}
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
