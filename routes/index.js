const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')

router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.get('/test', controllers.getInfo)

module.exports = router
