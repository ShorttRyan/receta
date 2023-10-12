// noinspection HtmlUnknownTarget

import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Recipe, User } from '@prisma/client'
import MainTemplate from '../../../templates/Main'

/* Types */
import { ExtendedRecipe } from '../../../types/extendedRecipe'

/* Utils */
import {
  logPageError,
  prisma,
  validateAccessToken,
} from '../../../utils/Server'

/* Child Components */
import ProfilePageContent from '../../../pageComponents/Profile'

export type ProfilePageProps = {
  username: string
  firstName: string
  lastName: string
  publishedRecipes: ExtendedRecipe[]
  likedRecipes: ExtendedRecipe[]
}

const User: NextPage<ProfilePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>@{props.username}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/receta-apple-touch-icon.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Receta User Profile" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍔</text></svg>"
        />
      </Head>
      <MainTemplate>
        <ProfilePageContent {...props} />
      </MainTemplate>
    </>
  )
}

// @ts-ignore
// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const cookies = req.cookies
  const { uid } = query
  // noinspection JSUnusedLocalSymbols
  const [token, error] = validateAccessToken(cookies?.auth)
  if (token === undefined) {
    res.writeHead(303, { Location: `/login?returnUrl=/profile/${uid}` })
    res.end()
    return { props: {} }
  }

  if (!uid || typeof uid != 'string') {
    res.writeHead(303, { Location: '/' })
  }

  let user: User | null = null
  try {
    user = await prisma.user.findUnique({
      where: {
        username: uid as string,
      },
    })
  } catch (e) {
    logPageError(e, `/user/${uid}`, token)
  }
  if (user === null) {
    res.writeHead(303, { Location: '/' })
  }

  let publishedRecipes: Recipe[] = []
  try {
    publishedRecipes = await prisma.recipe.findMany({
      where: {
        authorUsername: uid as string,
        isPrivate: false,
      },
      include: {
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    })
  } catch (e) {
    logPageError(e, `/user/${uid}`, token)
  }

  let likedRecipes: ExtendedRecipe[] = []
  try {
    likedRecipes = await prisma.recipe.findMany({
      where: {
        likedBy: {
          some: {
            id: user!.id,
          },
        },
        isPrivate: false,
        isDraft: false,
      },
      include: {
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    })
  } catch (e) {
    logPageError(e, '/', token)
  }
  return {
    props: {
      id: token.id,
      username: user!.username,
      firstName: user!.firstName,
      lastName: user!.lastName,
      publishedRecipes,
      likedRecipes,
    },
  }
}

export default User
