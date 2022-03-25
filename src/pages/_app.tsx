import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AddRecipeProvider } from '../pageComponents/AddRecipe/AddRecipeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AddRecipeProvider>
      <Component {...pageProps} />
    </AddRecipeProvider>
  )
}

// noinspection JSUnusedGlobalSymbols
export default MyApp
