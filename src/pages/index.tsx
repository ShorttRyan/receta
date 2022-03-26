// noinspection HtmlUnknownTarget

import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { prisma, validateAccessToken } from '../utils/Server'
import MainTemplate from '../templates/Main'
import HomeContent from '../pageComponents/HomeContent'
import { Recipe } from '@prisma/client'
import { UserDataProvider } from '../contexts/UserDataContext'

export interface HomePageProps {
  username: string
  firstName: string
  lastName: string
  email: string
  publishedRecipes: Recipe[]
  likedRecipes: Recipe[]
}

const Home: NextPage<HomePageProps> = (props) => {
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
        <UserDataProvider
          publishedRecipes={props.publishedRecipes}
          likedRecipes={props.likedRecipes}
        >
          <HomeContent />
        </UserDataProvider>
      </MainTemplate>
    </>
  )
}

// @ts-ignore
// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = req.cookies
  // noinspection JSUnusedLocalSymbols
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
  } catch (e) {
    console.log('### Error on Index.tsx ###')
    console.log('### Finding Published Recipes ###')
    console.log('user token: ', token)
    console.log(e)
  }

  let likedRecipes: Recipe[] = []
  try {
    likedRecipes = await prisma.recipe.findMany({
      where: {
        likedBy: {
          some: {
            id: token.id,
          },
        },
      },
    })
  } catch (e) {
    console.log('### Error on Index.tsx ###')
    console.log('### Finding Liked Recipes ###')
    console.log('user token: ', token)
    console.log(e)
  }
  return {
    props: {
      username: token.username,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      publishedRecipes,
      likedRecipes,
    },
  }
}

export default Home
