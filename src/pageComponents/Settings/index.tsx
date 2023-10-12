import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './SettingsContent.module.scss'

/* API */
import { logOut } from '../../API'

/* Types */
import { SettingsPageProps } from '../../pages/settings'

/* Child Components */
import Button from '../../components/Button'
import SettingsOverview from '../../components/SettingsOverview'

const SettingsContent: React.FunctionComponent<SettingsPageProps> = (props) => {
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
                await router.replace('/')
                await router.replace('/profile')
                await router.replace('/explore')
                await router.push('/')
                return
              }
              setDisabled(false)
            }}
            name="Sign Out"
          />
        </div>
      </div>
      <SettingsOverview
        email={props.email}
        firstName={props.firstName}
        lastName={props.lastName}
      />
    </div>
  )
}

export default SettingsContent
