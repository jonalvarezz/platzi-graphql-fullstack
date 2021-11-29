import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

// TODO: Use the graphQL API from https://platzi.com/cursos/nodejs-graphql
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('my-graphql-url-endpoint')
  const { data }: TAPIAvoResponse = await response.json()

  const paths = data.map(({ id }) => ({ params: { id } }))

  return {
    // Statically generate all paths
    paths,
    // Display 404 for everything else
    fallback: false,
  }
}

// TODO: Use the graphQL API from https://platzi.com/cursos/nodejs-graphql
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await fetch(`my-graphql-url-endpoint/${params?.id}`)
  const product = await response.json()

  // Pass post data to the page via props
  return { props: { product } }
}

const ProductPage = ({ product }: { product: TProduct }) => {
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
