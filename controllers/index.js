const mongoose = require("mongoose")
const users = require("../model")

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

module.exports = {
  insertData,
  getUsers,
  getUserById,
  getCards,
  getCardById,
  getDayById,
}
