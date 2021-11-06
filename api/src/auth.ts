import passport from 'passport'
import { Strategy as LocalAuth } from 'passport-local'
import type { VerifyFunction } from 'passport-local'
import type { Response, Request, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

declare global {
  namespace Express {
    interface User {
      id: number
      username: string
    }
  }
}

const orm = new PrismaClient()

const verify: VerifyFunction = async (username, password, done) => {
  try {
    const user = await orm.user.findUnique({ where: { username: username } })

    if (!user) {
      return done(null, false, { message: 'Wrong credentials' })
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      return done(null, false, { message: 'Wrong credentials' })
    }

    return done(null, user)
  } catch (err) {
    return done(err)
  }
}

passport.use(new LocalAuth(verify))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async function (userId, done) {
  try {
    const user = await orm.user.findUnique({
      where: { id: parseInt(String(userId), 10) },
    })

    if (!user) {
      return done(null, false)
    }

    const { id, username } = user

    done(null, { id, username })
  } catch (err) {
    done(err)
  }
})

export const login = passport.authenticate('local')

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout()
  next()
}

export default passport
