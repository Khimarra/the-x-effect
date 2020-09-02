const mongoose = require("mongoose")
const { users, cards, days } = require("../model")

let data = [
  {
    email: "henry@henry.com",
    password: "password",
    settings: {
      darkMode: true,
      colorScheme: 1,
      weekStart: 1,
    },
    cards: [
      {
        title: "henry's card",
        description: "this is a card description",
        startDate: "08-26-2020",
        endDate: "09-26-2020",
        successFill: "X",
        missedFill: "",
        days: [
          {
            success: true,
            notes: "this is a random note on some day",
          },
        ],
      },
    ],
  },
  {
    email: "george@george.com",
    password: "password",
    settings: {
      darkMode: true,
      colorScheme: 1,
      weekStart: 1,
    },
    cards: [
      {
        title: "george's card",
        description: "this is a card description",
        startDate: "07-12-2020",
        endDate: "09-26-2020",
        successFill: "X",
        missedFill: "",
        days: [
          {
            success: false,
            notes: "this is a random note on some day",
          },
        ],
      },
    ],
  },
  {
    email: "bobby@bobby.com",
    password: "password",
    settings: {
      darkMode: true,
      colorScheme: 1,
      weekStart: 1,
    },
    cards: [
      {
        title: "bobby's card",
        description: "this is a card description",
        startDate: "08-26-2020",
        endDate: "09-26-2020",
        successFill: "X",
        missedFill: "",
        days: [
          {
            success: true,
            notes: "this is a random note on some day",
          },
        ],
      },
    ],
  },
]

function insertData(req, res) {
  users.insertMany(data, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

function getUsers(req, res) {
  users.find({}, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

function getUserById(req, res) {
  users.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

function getCards(req, res) {
  users.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result.cards)
    }
  })
}

function getCardById(req, res) {
  users.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result.cards.id(req.params.card_id))
    }
  })
}

function getDayById(req, res) {
  users.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result.cards.id(req.params.card_id).days.id(req.params.day_id))
    }
  })
}

function deleteMany(req, res) {
  users.deleteMany({}, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

function updateUser(req, res) {
  users.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

let updateCard = async (req, res) => {
  users.findOne({ _id: req.params.id }, function (err, result) {
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
  users.findOne({ _id: req.params.id }, function (err, result) {
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

let createUser = (req, res) => {
  let newUser = new users({ ...req.body })
  newUser.save(function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send(newUser)
    }
  })
}

let createCard = (req, res) => {
  users.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      let newCard = new cards({ ...req.body })
      let startDate = new Date(req.body.startDate)
      let endDate = new Date(req.body.endDate)
      let dayCount = (endDate - startDate) / (1000 * 60 * 60 * 24)
      for (let i = 0; i < dayCount; i++) {
        newCard.days.push({success: false, notes: ""})
      }
      result.cards.push(newCard)
      result.save()
      res.send(newCard)
    }
  })
}

let deleteCard = (req, res) => {
  users.findOne({ _id: req.params.id }, function (err, result) {
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
}
