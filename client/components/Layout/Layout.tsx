import React, { PropsWithChildren } from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

import Navbar from '@components/Navbar/Navbar'
import Footer from '@components/Footer/Footer'

const siteTitle = 'Platzi GraphQL'

type LayoutProps = {
  children?: React.ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
    </Head>
    <Navbar />
    <Container as="main" text>
      {children}
    </Container>
    <Footer />
  </>
)

export default Layout
