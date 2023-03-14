const express = require('express')
const router = express.Router()
const calendarController = require('../controllers/index')

router.get('/', calendarController.getDays)


module.exports = router