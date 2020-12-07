const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const daySchema = new Schema(
  {
    success: {
      type: Boolean,
    },
    notes: {
      type: String,
    },
  },
  { collection: "Days" }
)

const cardSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    successFill: {
      type: String,
    },
    missedFill: {
      type: String,
    },
    days: [daySchema],
  },
  { collection: "Cards" }
)

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    settings: {
      darkMode: {
        type: Boolean,
      },
      colorScheme: {
        type: Number,
      },
      weekStart: {
        type: Number,
      },
    },
    cards: [cardSchema],
  },
  { collection: "Users" }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

module.exports = {
  users: mongoose.model("users", userSchema),
  cards: mongoose.model("cards", cardSchema),
  days: mongoose.model("days", daySchema)
}
