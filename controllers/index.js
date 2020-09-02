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
  console.log("updatecard")
  // cards.findByIdAndUpdate(req.params.card_id, req.body, function (err, result) {
  console.log(req.params.card_id)
  // cards.findById(req.params.card_id, function (err, doc) {
  //     console.log(doc)
  //     if (err) {
  //       console.log("update card error")
  //       res.send(err)
  //     } else {
  //       console.log("card updated")
  //       card.overwrite(req.body)
  //       card.save()
  //       // card.save(res.send(card))
  //       res.send(doc)
  //     }
  //   })

    users.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        const card = result.cards.id(req.params.card_id)
        console.log(card)
        console.log("new log", req.body)
        let days = card.days
        console.log("days", days)
        card.overwrite({ ...card, ...req.body })
        card.days = days
        result.save()
        res.send(card)

      }
    })

  // let user = users.findOne({ _id: req.params.id })
  // console.log("user", user)
  // const card = user.cards.id(req.params.card_id)
  // console.log(card)
  // card.overwrite({ title: "blah" })
  // console.log(card)
  // user.save()
  // res.send(card)
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
  updateCard
}

// 5f46e1f2f2bce7016cc7e68e
// 5f46e1f2f2bce7016cc7e68e