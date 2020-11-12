const passport = require ('passport')
const { users } = require('../model')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  "signup",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await users.create({ email, password })
        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await users.findOne({ email })
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          })
        }
        const validate = await user.isValidPassword(password)
        if (!validate) {
          return done(null, false, {
            message: "Incorrect username or password",
          })
        }
        return done(null, user, { message: "Logged in successfully" })
      } catch (error) {
        console.log(error)
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)
