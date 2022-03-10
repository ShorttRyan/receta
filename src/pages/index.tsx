import type { NextPage } from 'next'
import Head from 'next/head'
import FloatingBackground from '../components/FloatingBackground'
import styles from '../styles/pages/Home.module.scss'
import { GetServerSideProps } from 'next'
import { validateAccessToken } from '../utils/Server'
import Button from '../components/Button'
import { useRouter } from 'next/router'
import { logOut } from '../API/auth/logOut'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div className={styles.homeWrapper}>
      <Head>
        <title>Receta</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/receta-apple-touch-icon.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍔</text></svg>"
        />
      </Head>
      <FloatingBackground />
      <div className={styles.homeContent}>
        Home Page
        <Button
          label="Log Out"
          type="button"
          onClick={async () => {
            const [response, error] = await logOut()
            if (error === undefined) {
              await router.push('/login')
            }
          }}
        />
      </div>
    </div>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const cookies = req.cookies
  const [token, error] = validateAccessToken(cookies?.auth)
  if (token === undefined) {
    res.writeHead(303, { Location: '/login' })
    res.end()
    return { props: {} }
  }
  return {
    props: {
      username: token.username,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
    },
  }
}

export default Home
