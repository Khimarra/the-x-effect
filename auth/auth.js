const passport = require ('passport')
const localStrategy = require('passport-local').Strategy
const userModel = require('../model')

passport.use(
  "signup",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await userModel.create({ email, password })
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
        const user = await userModel.findOne({ email })
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
        return done(error)
      }
    }
  )
)
