const { users, cards, days } = require("../model")

// router.get("/profile", (req, res, next) => {
//   res.json({
//     message: "You made it to the secure route",
//     user: req.user,
//   })
// })


function getProfile(req, res) {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

module.exports = {
  getProfile
}
