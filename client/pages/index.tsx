import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '@components/Layout/Layout'
import { Card } from 'semantic-ui-react'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'

const avocadoFragment = `
  id
  image
  name
  createdAt
  sku
  price
  attributes {
    description
    taste
    shape
    hardiness
  }
`

// Esto va generalmente en una carpeta llamada api o service
const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const requester = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
})

const useAvocados = () => {
  const query = `
    query {
      avos {
        ${avocadoFragment}
      }
    }
  `
  return useQuery('avocados', async () => {
    const response = await requester.post<{ data: { avos: TProduct[] } }>(
      '/graphql',
      {
        query,
      }
    )
    return response.data.data
  })
}

const useAvocado = (id: number | string) => {
  const query = `
  query {
      avo(id: ${id}) {
        ${avocadoFragment}
      }
    }
  `

  return useQuery(['avocado', id], async () => {
    const response = await requester.post<{ data: { avo: TProduct } }>(
      '/graphql',
      {
        query,
      }
    )
    return response.data.data
  })
}

const HomePage = () => {
  const { data, status } = useAvocado(1)

  console.log({ data, status })

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
