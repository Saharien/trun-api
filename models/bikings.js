const mongoose = require('mongoose');

let bikingsSchema = new mongoose.Schema({
  activity: String,
  url: String,
  timestamp: String,
  name: String,
  distance: Number,
  elevgain: Number,
  type: String,
  date: Date
});

let Biking = mongoose.model('Biking', bikingsSchema);

module.exports = Biking;

module.exports.get = function (callback, limit) {
  Biking.find(callback).limit(limit);
}

module.exports.getHitlist = function (month, callback) {

  if (month == 'S') {
    monthInt = 4;
    nextMonthInt = 7;
  } else {
    monthInt = parseInt(month);
    nextMonthInt = monthInt + 1;
  }
  monthString = monthInt.toString().padStart(2, '0');
  nextMonthString = nextMonthInt.toString().padStart(2, '0');

  Biking.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date('2021-' + monthString + '-01'),
            $lt: new Date('2021-' + nextMonthString + '-01')
          }
        }
      },

      {
        $group:
        {
          _id: { name: "$name", url: "$url" },
          totalAmount: { $sum: "$distance" },
          //totalAmount: { $sum: { $round: [ "$distance", 2 ] } }, (rundet die Einzelzahlen, wenn dann das Endergebnis runden)
          elevgain: { $sum: "$elevgain" },
          count: { $sum: 1 },
        }
      },
      { $sort: { "totalAmount": -1 } }
    ],
    callback);
}