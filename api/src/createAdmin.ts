/**
 * This script creates or updates an admin user in the database based
 * on the ADMIN_USERNAME and ADMIN_PASSWORD environment variables.
 *
 * Check the .env.example file for more information.
 *
 * This process is ran in the `npm run migrate:prod` script.
 */
import * as dotenv from 'dotenv'
dotenv.config()

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const orm = new PrismaClient()

main(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)

async function main(
  username: string | undefined,
  password: string | undefined
) {
  if (!username || !password) {
    throw new Error('Username and password are required')
  }

  const hashedPassword = await hash(password as string, 10)

  const user = await orm.user.upsert({
    where: { username },
    update: {},
    create: {
      password: hashedPassword,
      username,
    },
  })

  console.log(`User ${user.username} created with id ${user.id}\n`)
}
