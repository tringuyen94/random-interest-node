const express = require('express')
const router = express.Router()
const calendarRouter = require('./calendar.router')



router.use('/calendar', calendarRouter)

module.exports = router