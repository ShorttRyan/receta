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
      <div className={styles.homeWrapper}>
        <Head>
          <title>Receta</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/receta-apple-touch-icon.png"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍔</text></svg>"
          />
        </Head>
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
