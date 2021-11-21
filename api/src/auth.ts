import passport from 'passport'
import { Strategy as LocalAuth } from 'passport-local'
import type { VerifyFunction } from 'passport-local'
import type { Response, Request, NextFunction, RequestHandler } from 'express'
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

const getRedirect = (req: Request) => {
  const redirect = req.body.redirect as string | undefined

  return {
    redirect,
    hasRedirect: typeof redirect === 'string',
  }
}

/**
 * Login with redirect support.
 *
 * The response will be redirected to the given `redirect` value if any.
 */
export const login: RequestHandler = (req, res, next) => {
  const { redirect, hasRedirect } = getRedirect(req)

  const options = hasRedirect
    ? {
        successRedirect: redirect,
        failureRedirect: `${redirect}/login?_error=${encodeURI(
          'Wrong credentials'
        )}`,
      }
    : {}

  const auth = passport.authenticate('local', options)

  return auth(req, res, next)
}

/**
 * Logout with redirect support.
 *
 * The response will be redirected to the given `redirect` value if any.
 */
export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout()
  const { redirect, hasRedirect } = getRedirect(req)

  if (hasRedirect) {
    res.redirect(redirect!)
  } else {
    next()
  }
}

export function getUserDetail(req: Request, res: Response) {
  let user = null
  if (req.user) {
    const { id, username } = req.user
    user = {
      id,
      username,
    }
  }

  res.json(user)
}

export default passport
