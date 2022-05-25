// noinspection HtmlUnknownTarget

import type { NextPage } from 'next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Recipe } from '@prisma/client'
import MainTemplate from '../../../templates/Main'
import {
  logPageError,
  prisma,
  validateAccessToken,
} from '../../../utils/Server'
import { AddRecipeProvider } from '../../../contexts/AddRecipeContext'
import AddRecipe from '../../../pageComponents/AddRecipe/AddRecipeForm'
import { JsonObject } from 'type-fest'
import {
  Instruction,
  Note,
} from '../../../pageComponents/AddRecipe/AddRecipeForm/InstructionsSection/types'
import { Ingredient } from '../../../pageComponents/AddRecipe/AddRecipeForm/IngredientSection/types'
import { uuid } from '../../../utils'

export interface RecipePageProps {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  recipe: Recipe
}

const EditRecipe: NextPage<RecipePageProps> = ({ recipe }) => {
  const instructions = recipe?.instructions as JsonObject[]
  const mappedInstructions: Instruction[] = instructions.map(
    ({ value, id }) => ({
      value: value as string,
      id: id as string,
    }),
  )
  const notes = recipe?.instructions as JsonObject[]
  const mappedNotes: Note[] = notes.map(({ value, id }) => ({
    value: value as string,
    id: id as string,
  }))
  const ingredients = recipe?.ingredients as JsonObject[]
  const mappedIngredients: Ingredient[] = ingredients.map(
    ({ name, amount, unit, id }) => ({
      name: name as string,
      amount: amount as string,
      unit: unit as string,
      id: id as string,
    }),
  )

  const seedForm = {
    title: {
      value: recipe?.title,
      required: true,
      error: false,
      message: '',
    },
    timeToComplete: {
      value: recipe?.timeToComplete,
      required: true,
      error: false,
      message: '',
    },
    description: {
      value: recipe?.description || '',
      required: true,
      error: false,
      message: '',
    },
    ingredients: {
      value: [
        ...mappedIngredients,
        { name: '', amount: '', unit: 'N/A', id: uuid() },
      ],
      required: true,
      error: false,
      message: '',
    },
    instructions: {
      value: [...mappedInstructions, { value: '', id: uuid() }],
      required: true,
      error: false,
      message: '',
    },
    notes: {
      value: [...mappedNotes, { value: '', id: uuid() }],
      required: true,
      error: false,
      message: '',
    },
    private: {
      value: recipe?.isPrivate,
      required: true,
      error: false,
      message: '',
    },
  }
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
        <AddRecipeProvider seedForm={seedForm} recipeId={recipe?.id}>
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
    if (recipe === null) {
      res.writeHead(303, { Location: '/404' })
      res.end()
      return
    }
  } catch (e) {
    logPageError(e, `/recipe/${rid}/edit`, token)
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
