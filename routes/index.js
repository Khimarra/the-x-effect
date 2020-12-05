const { Router } = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = Router()
const {
  insertData,
  getUsers,
  getCards,
  getCardById,
  getDayById,
  deleteMany,
  updateCard,
  updateDay,
  createCard,
  deleteCard,
} = require("../controllers")

router.get("/", function (req, res) {
  res.send("I Am gRoot")
})

// Admin/Auth routes:

// not secure
router
.route("/signup")
.post(
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({ message: "Signup successful", user: req.user })
  }
  )
  router.route("/login").post(async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      console.log(user)
      try {
        if (err || !user) {
          // const error = new Error(info.message)
          // return next(error)
          return res.json(info)
          // return next(info.message)
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error)
          const body = { _id: user._id, email: user.email }
          const token = jwt.sign({ user: body }, "TOP_SECRET")
          return res.json({ token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  })
  
  // card routes:
  
  // make secure and modify to only ever return user's cards
  // router.route("/users/:id/cards").get(getCards)
  // router.route("/users/:id/cards/:card_id").get(getCardById)
  // router.route("/users/:id/cards").post(createCard)
  // router.route("/users/:id/cards/:card_id").put(updateCard)
  // router.route("/users/:id/cards/:card_id").delete(deleteCard)
  // router.route("/users/:id/cards/:card_id/days/:day_id").get(getDayById)
  // router.route("/users/:id/cards/:card_id/days/:day_id").put(updateDay)
  
  // TEST ROUTES - REMOVE IN FINAL PRODUCTION VERSION
  router.route("/users").get(getUsers)
  router.route("/insertdata").post(insertData)
  router.route("/delete").delete(deleteMany)

module.exports = router
