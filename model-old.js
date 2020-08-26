const mongoose = require("mongoose")

const Schema = mongoose.Schema

let user = new Schema(
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
    cards: [
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
        days: [
          {
            success: {
              type: Boolean,
            },
            notes: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { collection: "Users" }
)

module.exports = mongoose.model("users", user)
