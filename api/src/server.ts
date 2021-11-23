import express from 'express'
import path from 'path'

const app = express()

// Middlewares
app.use('/static', express.static(path.join(__dirname, '../public')))

export default app
