import React, { useState } from 'react'
import styles from './ProfileOverview.module.scss'
import IconButton from '../IconButton'
import Input from '../Input'
import { UpdateProfileForm } from './type'
import Button from '../Button'
import { preUpdateProfileSubmit } from '../../utils/Client'
import { isUpdateProfilePrismaFailure, updateProfileInfo } from '../../API'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'

interface ProfileOverviewProps {
  email: string
  firstName: string
  lastName: string
}

const ProfileOverview: React.FunctionComponent<ProfileOverviewProps> = ({
  email,
  firstName,
  lastName,
}) => {
  const router = useRouter()
  const [editing, setEditing] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [info, setInfo] = useState<UpdateProfileForm>({
    firstName: {
      value: firstName,
      error: false,
      required: true,
    },
    lastName: {
      value: lastName,
      error: false,
      required: true,
    },
    email: {
      value: email,
      error: false,
      required: true,
    },
  })
  return (
    <div className={styles.profileOverviewWrapper}>
      <div className={styles.updateForm}>
        {editing ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!preUpdateProfileSubmit(info, setInfo)) return
              setDisabled(true)
              // noinspection JSUnusedLocalSymbols
              const [response, error] = await updateProfileInfo({
                firstName: info.firstName.value,
                lastName: info.lastName.value,
                email: info.email.value,
              })
              setDisabled(false)
              if (error === undefined) {
                await router.replace(router.asPath)
                await router.reload()
                return
              }
              const newInfo: UpdateProfileForm = { ...info }
              const errorData = error.response.data
              if (!isUpdateProfilePrismaFailure(errorData)) return
              if (error.response.data.prismaCode === 'P2002') {
                newInfo[errorData.field].error = true
                newInfo[
                  errorData.field
                ].message = `A user already exists with this ${errorData.field}`
              }
              setInfo(newInfo)
            }}
          >
            <Input
              name="First Name"
              id="firstName"
              placeholder="First Name"
              type="input"
              error={info.firstName.error}
              value={info.firstName.value}
              setValue={(newVal: string) => {
                const newCredentials = { ...info }
                newCredentials.firstName.value = newVal
                setInfo(newCredentials)
              }}
              onBlur={() => {
                const newCredentials = { ...info }
                newCredentials.firstName.error = false
                setInfo(newCredentials)
              }}
              message={info.firstName.message}
            />
            <Input
              name="Last Name"
              id="lastName"
              placeholder="Last Name"
              type="input"
              error={info.lastName.error}
              value={info.lastName.value}
              setValue={(newVal: string) => {
                const newCredentials = { ...info }
                newCredentials.lastName.value = newVal
                setInfo(newCredentials)
              }}
              onBlur={() => {
                const newCredentials = { ...info }
                newCredentials.lastName.error = false
                setInfo(newCredentials)
              }}
              message={info.lastName.message}
            />
            <Input
              name="Email"
              id="email"
              placeholder="Email"
              type="input"
              error={info.email.error}
              value={info.email.value}
              setValue={(newVal: string) => {
                const newCredentials = { ...info }
                newCredentials.email.value = newVal
                setInfo(newCredentials)
              }}
              onBlur={() => {
                const newCredentials = { ...info }
                newCredentials.email.error = false
                setInfo(newCredentials)
              }}
              message={info.email.message}
            />
            <div className={styles.buttonSection}>
              <Button
                label="Submit"
                type="submit"
                disabled={disabled}
                name="Submit Changes"
              />
              <Button
                label="Cancel"
                type="button"
                style="danger"
                name="Cancel Changes"
                onClick={() => setEditing(false)}
              />
            </div>
          </form>
        ) : (
          <>
            <div className={styles.editButtonWrapper}>
              <IconButton
                onClick={() => setEditing(true)}
                Icon={FiEdit}
                disabled={false}
                style="primary"
                size="medium"
                name="Edit Profile Info"
              />
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Name: </span>
                <span className={styles.infoValue}>
                  {firstName} {lastName}
                </span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Email: </span>
                <span className={styles.infoValue}>{email}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileOverview
