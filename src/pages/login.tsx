import type { NextPage } from 'next'
import Head from 'next/head'
import FloatingBackground from '../components/FloatingBackground'
import LoginSignup from '../components/LoginSignup'
import styles from '../styles/pages/Home.module.scss'
import { GetServerSideProps } from 'next'
import { validateAccessToken } from '../utils/Server'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Receta</title>
        <meta name="description" content="Receta Login Page" />
      </Head>
      <div className={styles.homeWrapper}>
        <div className={styles.homeContent}>
          <LoginSignup />
        </div>
      </div>
      <FloatingBackground />
    </>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const cookies = req.cookies
  const [token, error] = validateAccessToken(cookies?.auth)
  if (token) {
    res.writeHead(303, { Location: '/' })
    res.end()
  }
  return { props: {} }
}

export default Login
