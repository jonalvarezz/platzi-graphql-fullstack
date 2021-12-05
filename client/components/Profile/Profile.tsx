import { Segment, Header, Button } from 'semantic-ui-react'

import { removeToken } from '@service/auth'
import type { User } from '@service/auth'

import Layout from '@components/Layout/Layout'

function Profile({ user }: { user: User }) {
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
        <Button type="button" positive>
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
