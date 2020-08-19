const mongoose = require('mongoose')

const Schema = mongoose.Schema

let user = new Schema(
  {
    email: {
      type: String
    }
  },
  { collection: "Users" }
)

module.exports = mongoose.model('users', user)
