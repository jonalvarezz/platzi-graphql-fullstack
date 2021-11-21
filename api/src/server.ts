import express from 'express'
import path from 'path'
import session from 'express-session'
import { urlencoded } from 'body-parser'

import auth, { login, logout } from './auth'

export const app = express()

// Middlewares
app.use('/static', express.static(path.join(__dirname, '../public')))
app.use(
  session({
    secret: 'nunca-pares-de-aprender',
    resave: false,
    saveUninitialized: true,
  })
)
app.use(urlencoded({ extended: false }))
app.use(auth.initialize())
app.use(auth.session())

// Auth Routes
app.post('/login', login, (req, res) => {
  // end if no redirect is specified
  res.status(201).end()
})
app.post('/logout', logout, (req, res) => {
  // end if no redirect is specified
  res.status(202).end()
})

export default app
