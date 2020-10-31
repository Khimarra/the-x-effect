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

function editProfile(req, res) {
  users.findByIdAndUpdate(req.user._id, req.body, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

function getCards(req, res) {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result.cards)
    }
  })
}

function getCardById(req, res) {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result.cards.id(req.params.card_id))
    }
  })
}

function getDayById(req, res) {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result.cards.id(req.params.card_id).days.id(req.params.day_id))
    }
  })
}

let updateCard = async (req, res) => {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      const card = result.cards.id(req.params.card_id)
      let days = card.days
      card.overwrite({ ...req.body })
      card.days = days
      result.save()
      res.send(card)
    }
  })
}

let updateDay = async (req, res) => {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      const card = result.cards.id(req.params.card_id)
      let day = card.days.id(req.params.day_id)
      day.overwrite({ ...req.body })
      result.save()
      res.send(day)
    }
  })
}

let createCard = (req, res) => {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      let newCard = new cards({ ...req.body })
      let startDate = new Date(req.body.startDate)
      let endDate = new Date(req.body.endDate)
      let dayCount = (endDate - startDate) / (1000 * 60 * 60 * 24)
      for (let i = 0; i < dayCount; i++) {
        newCard.days.push({ success: false, notes: "" })
      }
      result.cards.push(newCard)
      result.save()
      res.send(newCard)
    }
  })
}

let deleteCard = (req, res) => {
  users.findOne({ _id: req.user._id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      result.cards.id(req.params.card_id).remove()
      result.save()
      res.send(result)
    }
  })
}

module.exports = {
  getProfile,
  editProfile,
  getCards,
  getCardById,
  getDayById,
  updateCard,
  updateDay,
  createCard,
  deleteCard
}
