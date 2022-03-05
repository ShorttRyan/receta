import type { NextPage } from 'next'
import Head from 'next/head'
import FloatingBackground from '../components/FloatingBackground'
import LoginSignup from '../components/LoginSignup'
import styles from '../styles/pages/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Receta</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍔</text></svg>" />
      </Head>
      <FloatingBackground />
      <div className={styles.homeContent}>
        <LoginSignup />
      </div>
    </div>
  )
}

export default Home
