const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const cors = require('cors')
const mongoose = require("mongoose")

const uri = "mongodb://localhost/xeffect"

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

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})

