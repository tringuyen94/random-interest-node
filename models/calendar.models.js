const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
   date: { type: Date, required: true },
   interest: { type: Number, required: true },
   isWin: { type: Boolean, required: true }
})

const Calendar = mongoose.model('Calendar', calendarSchema)

module.exports = Calendar