import express from 'express'
import path from 'path'
import cors from 'cors'
import session from 'express-session'
import { urlencoded } from 'body-parser'

import auth, { login, logout, getUserDetail } from './auth'
import { favicon } from './favicon'

export const app = express()

const SITE_URL = process.env.SITE_URL

app.get('/favicon.ico', favicon)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

// Middlewares
app.use('/static', express.static(path.join(__dirname, '../public')))
// Set HTTP cookies with CORS
app.set('trust proxy', 1)
app.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      cb(null, origin || '*')
    },
  })
)
app.use(
  session({
    secret: 'nunca-pares-de-aprender',
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'platzi-graphql-fullstack.vercel.app',
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
app.get('/user', getUserDetail)

export default app
