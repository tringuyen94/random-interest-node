const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const api = require('./router')
dotenv.config()
const Calendar = require('./models/calendar.models')
const { generateData } = require('./controllers')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', api)

mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
   Calendar.find({})
      .sort({ date: 1 })
      .limit(1)
      .then(async result => {
         const oldestDate = result[0].date;
         const today = new Date();
         const dayDiff = Math.ceil((today.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24));
         if (dayDiff > 28) {
            // Remove the document(s) with the oldest date
            await Calendar.deleteMany({ date: oldestDate })
            // Generate new Calendar for today
            const newCalendar = generateData(1);

            // Save the new Calendar to the Calendarbase
            await Calendar.insertMany(newCalendar);
         }
      })
      .catch(error => console.error(error))
   console.log('Connected Database')
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on ${PORT} 🚀🚀🚀`))

