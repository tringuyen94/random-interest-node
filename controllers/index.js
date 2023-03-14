const Calendar = require("../models/calendar.models");

const generateData = async (days) => {
   const now = new Date();
   const data = [];

   let sumNegativeInterest = 0;
   let sumPositiveInterest = 0;

   for (let i = 1; i <= days; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const interest = (Math.random() * (1.2 - -0.5) + -0.5).toFixed(2);
      let isWin = interest > 0;

      if (interest < 0 && sumNegativeInterest <= -6) {
         interest = (Math.random() * (1.2 - 0) + 0).toFixed(2);
         isWin = true;
      }
      if (interest > 0 && sumPositiveInterest >= 18) {
         interest = (Math.random() * (-0.5 - 0) + 0).toFixed(2);
         isWin = false;
      }

      if (interest < 0) {
         sumNegativeInterest += parseFloat(interest);
      } else {
         sumPositiveInterest += parseFloat(interest);
      }

      data.push({ date, interest, isWin });
   }
   return data
}

const getDays = (req, res, next) => {
   Calendar.find()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
}

module.exports = { getDays, generateData }