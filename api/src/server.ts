import express from 'express'
import path from 'path'
import cors from 'cors'
import session from 'express-session'
import { urlencoded } from 'body-parser'

import auth, { login, logout, getUserDetail } from './auth'
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
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      sameSite: 'none',
    },
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
app.get(
  '/user',
  // Required: limit credentials to this origin only
  cors({ origin: process.env.SITE_URL, credentials: true }),
  getUserDetail
)

export default app
