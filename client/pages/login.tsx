import React from 'react'

function Login() {
  return (
    <form action="http://localhost:4000/login" method="POST">
      <input type="hidden" name="redirect" value="/" />
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
