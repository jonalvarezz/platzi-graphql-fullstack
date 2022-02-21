import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import prompt from 'prompt'

const orm = new PrismaClient()

prompt.start()

prompt.get(
  [
    {
      name: 'username',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
    },
    {
      name: 'password',
      // @ts-ignore outdated types
      hidden: true,
      replace: '*',
      required: true,
    },
  ],
  async function (err, result) {
    if (err) {
      console.warn('Huh. Something went wrong.')
      return
    }
    const username = result.username as string
    const hashedPassword = await hash(result.password as string, 10)

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
)
