import express from 'express'
import path from 'path'
import session from 'express-session'
import { urlencoded } from 'body-parser'

import auth, { login, logout } from './auth'
import { favicon } from './favicon'

export const app = express()

app.get('/favicon.ico', favicon)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

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
app.post('/login', login, (req, res) => {
  res.status(201).end()
})
app.post('/logout', logout, (req, res) => {
  res.status(202).end()
})

export default app
