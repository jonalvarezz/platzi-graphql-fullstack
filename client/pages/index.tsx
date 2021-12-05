import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'
import client from '@service/client'
import { GetAllAvocadosDocument } from '@service/graphql'
import type { AvocadoFragment } from '@service/graphql'

export const getStaticProps: GetStaticProps<{ products: AvocadoFragment[] }> =
  async () => {
    try {
      const response = await client.query({
        query: GetAllAvocadosDocument,
      })

      if (response.data.avos == null) {
        throw new Error(`There was an error fetching the items`)
      }

      const products = response.data.avos as AvocadoFragment[]
      return { props: { products } }
    } catch (e) {
      console.log(e)
      return {
        props: {
          products: [],
        },
      }
    }
  }

const HomePage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Home">
      <KawaiiHeader />
      <ProductList products={products} />
    </Layout>
  )
}

export default HomePage
