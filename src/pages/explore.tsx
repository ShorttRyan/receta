// noinspection HtmlUnknownTarget

import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import MainTemplate from '../templates/Main'

/* Types */
import { ExtendedRecipe } from '../types/extendedRecipe'

/* Utils */
import {
  logPageError,
  prisma,
  validateAccessToken,
  fetchLiked,
  fetchNewest,
} from '../utils/Server'

/* Child Components */
import ExplorePage from '../pageComponents/Explore'

/* Constants */
import { guestToken } from '../constants/cookie'

export type ExplorePageProps = {
  username: string
  firstName: string
  lastName: string
  email: string
  totalRecipes: number
  mostLiked: ExtendedRecipe[]
  newest: ExtendedRecipe[]
}

const Explore: NextPage<ExplorePageProps> = (props) => {
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
        <ExplorePage {...props} />
      </MainTemplate>
    </>
  )
}

// @ts-ignore
// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = req.cookies
  // noinspection JSUnusedLocalSymbols
  let [token, error] = validateAccessToken(cookies?.auth)
  if (token === undefined) token = guestToken
  let totalRecipes
  try {
    totalRecipes = await prisma.recipe.count({
      where: {
        isPrivate: false,
        isDraft: false,
        authorId: {
          not: token.id,
        },
      },
    })
  } catch (e) {
    logPageError(e, '/explore', token)
  }

  let mostLiked
  try {
    mostLiked = await fetchLiked(
      0,
      parseInt(process.env.NEXT_PUBLIC_EXPLORE_RESULTS as string),
      token.id,
    )
  } catch (e) {
    logPageError(e, '/explore', token)
  }
  let newest
  try {
    newest = await fetchNewest(
      0,
      parseInt(process.env.NEXT_PUBLIC_EXPLORE_RESULTS as string),
      token.id,
    )
  } catch (e) {
    logPageError(e, '/explore', token)
  }
  return {
    props: {
      username: token.username,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      totalRecipes,
      mostLiked,
      newest,
    },
  }
}

export default Explore
