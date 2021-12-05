import { Segment, Header, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { AddAvocadoDocument } from '@service/graphql'
import { removeToken } from '@service/auth'
import type { User } from '@service/auth'

import Layout from '@components/Layout/Layout'

function Profile({ user }: { user: User }) {
  const [addAvocado, { loading, data, error }] = useMutation(AddAvocadoDocument)

  // Resultado de la mutación
  console.log({ loading, error, data })

  const addNew = () => {
    // Hey! El reto es hacer esto a tráves de un formulario
    // Y solo se ha dejado aquí por propósitos de testing y referencia.
    // Si recuerda que el valor `sku` tiene que ser único.
    addAvocado({
      variables: {
        data: {
          name: 'Zutano Avocado',
          sku: 'MW79KJO6Y',
          price: 1.23,
          image: '/static/zutano.jpg',
          description:
            'The Zutano avocado is a cold hardy, consistent producing avocado variety. It resembles the Fuerte in appearance but is less flavorful but more cold hardy. The green fruits are obovate in shape with waxy bumps on the skin. The flesh has a low oil but high water content which causes it to have a more fibrous texture.',
          shape: 'Pear',
          hardiness: '-5 °C',
          taste: 'Splendid, is an avocado',
        },
      },
    })
  }

  const logout = async () => {
    await removeToken()
    window.location.reload()
  }

  return (
    <Layout title="Hola">
      <div className="mt-14" />
      <Header as="h2" size="huge" className="">
        Hola, {user.username}
      </Header>
      <Segment>
        <p>
          Si estás viendo esto es porque has iniciado sesión de forma correcta.
        </p>
        <Button type="button" positive onClick={addNew}>
          Agregar nuevo avocado...
        </Button>{' '}
        <Button type="button" basic color="red" onClick={logout}>
          Logout
        </Button>
      </Segment>
      <div className="mb-20" />
    </Layout>
  )
}

export default Profile
