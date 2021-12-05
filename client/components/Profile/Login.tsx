import { Segment, Header, Form, Button, Message } from 'semantic-ui-react'

import { useLogin } from '@service/auth'
import Layout from '@components/Layout/Layout'

function Login() {
  const { login, message, isLoading } = useLogin({
    onDone: () => window.location.replace('/'),
  })

  return (
    <Layout title="Inicia sesión">
      <div className="mt-14" />
      <Header as="h2" size="huge" className="">
        Login
      </Header>
      {message && <Message error content={message} />}
      <Segment>
        <Form loading={isLoading} onSubmit={login}>
          <Form.Field>
            <label htmlFor="form-username">Nombre de usuario</label>
            <input
              id="form-username"
              name="username"
              placeholder="Nombre de usuario"
              autoFocus
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="form-password">Contraseña</label>
            <input
              id="form-password"
              name="pass"
              placeholder="Contraseña"
              type="password"
              required
            />
          </Form.Field>
          <Button type="submit" positive>
            Ingresar
          </Button>
        </Form>
      </Segment>
      <div className="mb-20" />
    </Layout>
  )
}

export default Login
