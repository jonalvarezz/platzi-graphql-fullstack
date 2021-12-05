import { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'

import { useCurrentUser } from '@store/Auth'

import Layout from '@components/Layout/Layout'
import Login from '@components/Profile/Login'
import Profile from '@components/Profile/Profile'

function CurrentUser() {
  const { user, status } = useCurrentUser()

  if (status !== 'success') {
    return (
      <Layout title="Cargando...">
        <div className="w-full h-80 flex items-center justify-center">
          <Loader active inline="centered" />
        </div>
      </Layout>
    )
  }

  if (user == null) {
    return <Login />
  }

  return <Profile user={user} />
}

export default CurrentUser
