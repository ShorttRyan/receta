import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { prisma, validateAccessToken } from '../utils/Server'
import MainTemplate from '../templates/Main'
import HomeContent from '../pageComponents/HomeContent'
import { Recipe } from '@prisma/client'

interface HomePageProps {
  username: string
  firstName: string
  lastName: string
  email: string
  publishedRecipes: Recipe[]
}

const Home: NextPage<HomePageProps> = (props) => {
  console.log(props)
  return (
    <>
      <Head>
        <title>Receta</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/receta-apple-touch-icon.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Receta Dashboard" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍔</text></svg>"
        />
      </Head>
      <MainTemplate>
        <HomeContent />
      </MainTemplate>
    </>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = req.cookies
  const [token, error] = validateAccessToken(cookies?.auth)
  if (token === undefined) {
    res.writeHead(303, { Location: '/login' })
    res.end()
    return { props: {} }
  }
  let publishedRecipes: Recipe[] = []
  try {
    publishedRecipes = await prisma.recipe.findMany({
      where: {
        authorUsername: token.username,
      },
    })
  } catch (e) {}
  return {
    props: {
      username: token.username,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      publishedRecipes,
    },
  }
}

export default Home
