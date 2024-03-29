// noinspection HtmlUnknownTarget

import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import MainTemplate from '../../../templates/Main'

/* Utils */
import {
  logPageError,
  prisma,
  validateAccessToken,
} from '../../../utils/Server'

/* Types */
import { RecipeWithLikedBy } from '../../../types/extendedRecipe'

/* Constants */
import { fakeRecipe } from '../../../constants/fakeRecipe'

/* Child Components */
import RecipeContent from '../../../pageComponents/Recipe'

export type RecipePageProps = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  recipe: RecipeWithLikedBy
  isOwner: boolean
  permitted: boolean
}

const Recipe: NextPage<RecipePageProps> = (props) => {
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
        <RecipeContent
          recipe={props.recipe}
          isOwner={props.isOwner}
          permitted={props.permitted}
        />
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
  const { rid } = query
  // noinspection JSUnusedLocalSymbols
  const [token, error] = validateAccessToken(cookies?.auth)
  if (token === undefined) {
    res.writeHead(303, { Location: `/login?returnUrl=/recipe/${rid}` })
    res.end()
    return { props: {} }
  }
  let recipe
  try {
    recipe = await prisma.recipe.findUnique({
      where: {
        id: rid as string,
      },
      include: {
        _count: {
          select: {
            likedBy: true,
          },
        },
        likedBy: {
          where: {
            id: token.id,
          },
          select: {
            id: true,
          },
        },
      },
    })
    if (recipe === null) {
      res.writeHead(303, { Location: '/404' })
      res.end()
      return
    }
  } catch (e) {
    logPageError(e, `/recipe/${rid}`, token)
  }
  const isOwner = recipe?.authorId === token.id
  let permitted = true
  if ((recipe?.isPrivate || recipe?.isDraft) && !isOwner) {
    recipe = fakeRecipe
    permitted = false
  }
  return {
    props: {
      id: token.id,
      username: token.username,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      recipe,
      isOwner,
      permitted,
    },
  }
}

export default Recipe
