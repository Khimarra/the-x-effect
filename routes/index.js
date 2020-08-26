const { Router } = require('express')
const router = Router()
const { insertData, getUsers, getUserById } = require('../controllers')

router.get('/', function (req, res) {
  res.send('I Am gRoot')
})

// Admin/Auth routes:
router.route("/users").get(getUsers)

router.route("/users/:id").get(getUserById)

// router.route("/users/:id").put()

// router.route("/users/:id").delete()


// User routes:
// router.route("/profile").get()

// router.route("/users").post()

// router.route("/cards").get()

// router.route("/cards/:id").get()

// router.route("/cards").post()

// router.route("/cards/:id").put()

// router.route("/cards/:id").delete()

// router.route("/profile").put()

// router.route("/cards/:id/days/:day_id").put()

router.route("/insertdata").post(insertData)

// router.route("/fetchdata").get(fetchData)



module.exports = router
