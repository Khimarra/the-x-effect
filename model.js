const mongoose = require("mongoose")

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
    },
    password: {
      type: String,
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

module.exports = {
  users: mongoose.model("users", userSchema),
  cards: mongoose.model("cards", cardSchema),
  days: mongoose.model("days", daySchema)
}

