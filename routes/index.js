const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = Router()
const {
  insertData,
  getUsers,
  getUserById, 
  getCards, 
  getCardById, 
  getDayById, 
  deleteMany, 
  updateUser,
  updateCard,
  updateDay,
  createUser,
  createCard,
  deleteCard
} = require('../controllers')



router.get('/', function (req, res) {
  res.send('I Am gRoot')
})

// Admin/Auth routes:
router.route("/users").get(getUsers)

router.route("/users/:id").get(getUserById)

router.route("/users/:id").put(updateUser)

router.route("/signup").post(
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({ message: "Signup successful", user: req.user })
  }
)

router.route("/login").post(async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("an error occurred")
        return next(error)
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

// router.route("/cards").get(getCards)

// router.route("/users/:id").delete()


// User routes:
// router.route("/profile").get()

router.route("/users").post(createUser)

router.route("/users/:id/cards").get(getCards)

router.route("/users/:id/cards/:card_id").get(getCardById)

router.route("/users/:id/cards").post(createCard)

router.route("/users/:id/cards/:card_id").put(updateCard)

router.route("/users/:id/cards/:card_id").delete(deleteCard)

// router.route("/profile").put()

router.route("/users/:id/cards/:card_id/days/:day_id").get(getDayById)

router.route("/users/:id/cards/:card_id/days/:day_id").put(updateDay)

router.route("/insertdata").post(insertData)

// router.route("/fetchdata").get(fetchData)

router.route("/delete").delete(deleteMany)



module.exports = router
