import { useQuery } from '@apollo/client'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'
import { GetAllAvocadosDocument } from '@service/graphql'
import type { AvocadoFragment } from '@service/graphql'

const HomePage = () => {
  const { data, loading } = useQuery(GetAllAvocadosDocument)

  let products = (data?.avos || []) as AvocadoFragment[]

  return (
    <Layout title="Home">
      <KawaiiHeader />
      <ProductList products={products} />
    </Layout>
  )
}

export default HomePage
