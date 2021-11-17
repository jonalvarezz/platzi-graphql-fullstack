import path from 'path'
import fs from 'fs'
import type { RequestHandler } from 'express'

const filename = path.resolve(path.join(__dirname, '../public/favicon.ico'))

export const favicon: RequestHandler = (req, res) => {
  res.set('Content-Type', 'image/x-icon')
  fs.createReadStream(filename).pipe(res)
}
