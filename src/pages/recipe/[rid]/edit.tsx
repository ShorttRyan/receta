// noinspection HtmlUnknownTarget

import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Recipe } from '@prisma/client'
import MainTemplate from '../../../templates/Main'
import { prisma, validateAccessToken } from '../../../utils/Server'
import { AddRecipeProvider } from '../../../contexts/AddRecipeContext'
import AddRecipe from '../../../pageComponents/AddRecipe/AddRecipeForm'

export interface RecipePageProps {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  recipe: Recipe
}

const EditRecipe: NextPage<RecipePageProps> = ({ recipe }) => {
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
        <AddRecipeProvider seedRecipe={recipe}>
          <AddRecipe />
        </AddRecipeProvider>
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
    res.writeHead(303, { Location: '/login' })
    res.end()
    return { props: {} }
  }
  let recipe
  try {
    recipe = await prisma.recipe.findUnique({
      where: {
        id: rid as string,
      },
    })
  } catch (e) {
    console.log(`### Error on /recipe/${rid}/edit ###`)
    console.log('user token: ', token)
    console.log(e)
  }
  const isOwner = recipe?.authorId === token.id
  if (!isOwner) {
    res.writeHead(303, { Location: `/recipe/${rid}` })
    res.end()
    return
  }
  return {
    props: {
      id: token.id,
      username: token.username,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      recipe,
    },
  }
}

export default EditRecipe
