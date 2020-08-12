const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/xeffect', {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connectionerror:'))
db.once('once', function () {
  const xeffectSchema = new.mongoose.Schema({
    email: string
    
  })
})
