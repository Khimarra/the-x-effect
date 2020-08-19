const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
// const routes = require('./routes')
const cors = require('cors')
const mongoose = require("mongoose")
const users = require('./model')
const router = express.Router()

const uri = "mongodb://localhost/xeffect"

// const path = require('path')

const app = express()

const port = 3001
// const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(logger("dev"))
app.use(cors())


// mongoose.connect(
//   "mongodb://localhost/xeffect",
//   { useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// )


// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connectionerror:'))
// db.once('once', function () {
//   const xeffectSchema = new mongoose.Schema({
//     email: string

//   })
// })

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection

// connection.on("error", console.error.bind(console, "connectionerror:"))
connection.once("open", function () {
  console.log("MongoDB database connection established successfully")
  // const xeffectSchema = new mongoose.Schema({
  //   email: string

  // })
  // const User = mongoose.model('User', xeffectSchema)
  // const henry = new User({ email: 'henry@henry.com' })
  // console.log(henry.email)
})

app.use("/", router)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
