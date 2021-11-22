import React, { useEffect } from 'react'

const endpoint = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/login`

function Login() {
  const login: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const username = event.currentTarget.username.value
    const password = event.currentTarget.password.value

    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.log('Failed to login', response.status)
      return
    }

    const data = await response.json()
    console.log('Logged in', data)
    sessionStorage.setItem('token', data.token)
  }

  return (
    <form onSubmit={login}>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
