const mongoose = require("mongoose")
const users = require("../model")

let data = [
  {
    email: "henry@henry.com",
  },
  {
    email: "george@george.com",
  },
  {
    email: "bobby@bobby.com",
  },
]

function insertData (req, res) {
  users.insertMany(data, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

function getUsers (req, res) {
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

module.exports = { 
  insertData,
  getUsers,
  getUserById
}
