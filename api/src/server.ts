import express from 'express'
import path from 'path'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

import auth, { login, currentUser } from './auth'

export const app = express()

// Middlewares
app.use(cors())
app.use('/static', express.static(path.join(__dirname, '../public')))
app.use(urlencoded({ extended: false }))
app.use(auth)

// Auth Routes
app.post('/api/login', json(), login)
app.get('/api/user/current', currentUser)

export default app
