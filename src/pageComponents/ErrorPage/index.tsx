import React from 'react'
import styles from './ErrorPage.module.scss'
import Link from 'next/link'

export enum ErrorCode {
  PageNotFound = '404',
  ServerError = '500',
}

export type ErrorPageProps = {
  code: ErrorCode
  subTitle: string
}

const ErrorPage: React.FunctionComponent<ErrorPageProps> = ({
  code,
  subTitle,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{code}</div>
        <div className={styles.subtitle}>{subTitle}</div>
        <div className={styles.linkWrapper}>
          <Link href="/">
            <a>Click here to go back to the home page</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ErrorPage
