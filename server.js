const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const cors = require('cors')
// const path = require('path')

const app = express()

const port = 3001
// const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(logger("dev"))
app.use(cors())

app.use("/", routes)

// mongoose.connect(
//   "mongodb://localhost/xeffect",
//   { useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connectionerror:'))
// db.once('once', function () {
//   const xeffectSchema = new mongoose.Schema({
//     email: string

//   })
// })
