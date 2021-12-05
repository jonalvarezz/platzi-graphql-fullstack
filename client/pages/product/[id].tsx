import React from 'react'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import client from '@service/client'
import { GetAllAvocadosDocument, GetAvocadoDocument } from '@service/graphql'
import type { AvocadoFragment } from '@service/graphql'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.query({ query: GetAllAvocadosDocument })
  const data = response.data.avos

  const paths = data.map((avo, index) => {
    if (avo == null) {
      throw new Error(
        `An avocado entry with no data was found at index ${index}`
      )
    }

    return { params: { id: avo.id } }
  })

  return {
    paths,
    // Pre-renderice las paginas anteriores y para toda nueva página nueva
    // intente generarla desde el servidor bajo demanda
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ product: AvocadoFragment }> =
  async ({ params }) => {
    try {
      const response = await client.query({
        query: GetAvocadoDocument,
        variables: { avoId: params?.id as string },
      })

      if (response.data.avo == null) {
        throw new Error(`Item with id ${params?.id} was not found.`)
      }

      // Pass post data to the page via props
      return { props: { product: response.data.avo } }
    } catch (e) {
      return {
        notFound: true,
      }
    }
  }

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={product.name}>
      <ProductSummary product={product} />
    </Layout>
  )
}

export default ProductPage
