import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/Login.module.scss'
import { GetServerSideProps } from 'next'

/* Utils */
import { validateAccessToken } from '../utils/Server'

/* Child Components */
import LoginSignup from '../components/LoginSignup'
import FloatingBackground from '../components/FloatingBackground'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Receta</title>
        <meta name="description" content="Receta Login Page" />
      </Head>
      <div>
        <div className={styles.loginContent}>
          <LoginSignup />
        </div>
      </div>
      <FloatingBackground />
    </>
  )
}

// @ts-ignore
// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const cookies = req.cookies
  // noinspection JSUnusedLocalSymbols
  const [token, error] = validateAccessToken(cookies?.auth, '/login.tsx')
  if (token) {
    res.writeHead(303, { Location: '/' })
    res.end()
  }
  return { props: {} }
}

export default Login
