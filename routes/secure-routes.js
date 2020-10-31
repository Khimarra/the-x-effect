const express = require("express")
const router = express.Router()

const {
  getProfile
} = require("../controllers/secure-controllers")

router.route("/profile").get(getProfile)

module.exports = router
