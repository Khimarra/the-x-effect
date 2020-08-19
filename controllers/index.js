// const mongoose = require("mongoose")

// const uri = "mongodb://localhost/xeffect"

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// const connection = mongoose.connection

// connection.on('error', console.error.bind(console, 'connectionerror:'))
// connection.once('once', function () {
//   console.log("MongoDB database connection established successfully")
//   // const xeffectSchema = new mongoose.Schema({
//   //   email: string

//   // })
//   // const User = mongoose.model('User', xeffectSchema)
//   // const henry = new User({ email: 'henry@henry.com' })
//   // console.log(henry.email)
// })

// const getInfo = async (req, res) => {
//   const thing = db.collection('stuff').find()
//   return res.send(thing)
//   // console.log(thing)
//   // try {
//   //   const tickets = await Ticket.findAll()
//   //   return res.status(200).json({ tickets })
//   // } catch (error) {
//   //   return res.status(500).send(error.message)
//   // }
// }

// module.exports = { 
//   getInfo
// }
