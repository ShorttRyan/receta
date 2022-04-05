import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import MainTemplate from '../templates/Main'
import Page404, { ErrorCode } from '../pageComponents/ErrorPage'
import ErrorPage from '../pageComponents/ErrorPage'

const Custom404: NextPage = () => {
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
        <ErrorPage
          code={ErrorCode.ServerError}
          subTitle={'The was an error generating this page.'}
        />
      </MainTemplate>
    </>
  )
}

export default Custom404
