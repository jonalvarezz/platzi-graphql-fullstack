import express from 'express'
import path from 'path'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

import auth, { login, currentUser } from './auth'
import { favicon } from './favicon'

export const app = express()

app.get('/favicon.ico', favicon)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

// Middlewares
app.use(cors())
app.use('/static', express.static(path.join(__dirname, '../public')))
app.use(urlencoded({ extended: false }))
app.use(auth)

// Auth Routes
app.post('/api/login', json(), login)
app.get('/api/user/current', currentUser)

export default app
