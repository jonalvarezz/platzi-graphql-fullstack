import { Card } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'

function About() {
  return (
    <Layout title="Más sobre este proyecto">
      <KawaiiHeader />
      <p>
        Este es un proyecto creado en el{' '}
        <a
          href="https://platzi.com/cursos/graphql-next/"
          target="_blank"
          rel="noreferrer"
        >
          Curso de GraphQL con Next.js de Platzi
        </a>{' '}
        por{' '}
        <a
          href="https://twitter.com/jonalvarezz"
          target="_blank"
          rel="noreferrer"
        >
          @jonalvarezz
        </a>
      </p>
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

      <style jsx>{`
        p {
          text-align: center;
          padding: 2rem 0 3rem;
          max-width: 420px;
          margin: 0 auto;
        }
        p > a {
          text-decoration: underline;
        }
      `}</style>
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

export default About
