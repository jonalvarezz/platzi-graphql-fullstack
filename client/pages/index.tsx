import {useState, useEffect} from 'react'
import Layout from '@components/Layout/Layout'
import { Card } from 'semantic-ui-react'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'

const query = `
  query{
    products{
      id
      title
      price
    }
  }
`

const requester = (endpoint?: string, data?: Record<string, number | string>) =>
  fetch(`https://api.escuelajs.co${endpoint}`,{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
  })

const useAvocados = () => {
  const [data, setData] = useState<TProduct[]>([])
  const [status, setStatus] = useState<'success'| 'loading' | 'error' | 'idle'>('idle')

  useEffect(()=>{
    const fetchItems = async () => {
      setStatus('loading')
      try {
        const response = await requester('/graphql', { query })

        const { data } = (await response.json()) as { data: TProduct[]}
        setData(data)
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }
    fetchItems()
  }, [])

  return {
    data,
    status
  }

}

const HomePage = () => {
  const {data, status} = useAvocados()

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
