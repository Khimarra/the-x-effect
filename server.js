const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()

// const uri = "mongodb://localhost/xeffect"

const uri = `mongodb+srv://${process.env.username}:${process.env.pwd}@voidcluster.5czay.mongodb.net/xeffect?retryWrites=true&w=majority`


const app = express()

const port = 3001

app.use(bodyParser.json())
app.use(logger("dev"))
app.use(cors())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection

connection.once("open", function () {
  console.log("MongoDB database connection established successfully")
})

app.use("/", routes)

app.listen(process.env.PORT || port, () => {
  console.log(`Connection successful!`)
})

