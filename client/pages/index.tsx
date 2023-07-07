import Layout from '@components/Layout/Layout'
import { Card } from 'semantic-ui-react'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import axios from 'axios'
import { useQuery } from 'react-query'

const query = `
  query{
    products{
      id
      title
      price
    }
  }
`

const queryProduct = `
  query{
    product(id: 48){
      id
      title
      price
      description
      images
      creationAt
      updatedAt
    }
  }
`

const baseURL =
  process.env.NEXT_PUBLIC_SERVICE_URL || 'https://api.escuelajs.co'

const requester = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
})

const useProduct = () => {
  return useQuery('product', async () => {
    const response = await requester.post<{ data: TProduct[] }>('/graphql', {
      query: queryProduct,
    })

    return response.data.data
  })
}

const useProducts = () => {
  return useQuery('products', async () => {
    const response = await requester.post<{ data: TProduct[] }>('/graphql', {
      query,
    })

    return response.data.data
  })
}

const HomePage = () => {
  const { data, status } = useProducts()
  const { data2, status2 } = useProduct()

  return (
    <Layout title="Home">
      <KawaiiHeader />
      <Card.Group itemsPerRow={2} centered>
        {documentationList.map((doc) => (
          <Card
            key={doc.link}
            href={doc.link}
            header={doc.title}
            meta={doc.meta}
            description={doc.description}
          />
        ))}
      </Card.Group>
    </Layout>
  )
}

const documentationList = [
  {
    title: 'Documentación Proyecto',
    meta: 'Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-graphql-fullstack',
  },
  {
    title: 'Documentación Next.js',
    meta: 'Documentación',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación GraphQL',
    meta: 'Documentación',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://graphql.org/learn/',
  },
  {
    title: 'Curso de GraphQL con Node.js',
    meta: 'Proyecto',
    description:
      'Revisa el curso en donde creamos todo el backend y la API para este proyecto.',
    link: 'https://platzi.com/cursos/graphql-nodejs/',
  },
]

export default HomePage