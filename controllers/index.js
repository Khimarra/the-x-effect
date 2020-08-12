const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/xeffect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connectionerror:'))
db.once('once', function () {
  const xeffectSchema = new mongoose.Schema({
    email: string

  })
  const User = mongoose.model('User', xeffectSchema)
  const henry = new User({ email: 'henry@henry.com' })
  console.log(henry.email)
})

const getInfo = async (req, res) => {
  const thing = db.collection('stuff').find()
  return res.send(thing)
  // console.log(thing)
  // try {
  //   const tickets = await Ticket.findAll()
  //   return res.status(200).json({ tickets })
  // } catch (error) {
  //   return res.status(500).send(error.message)
  // }
}

module.exports = { 
  getInfo
}
