const mongoose = require('mongoose');

let runsSchema = new mongoose.Schema({
  activity: String,
  url: String,
  timestamp: String,
  name: String,
  distance: Number,
  date: Date
});

let Run = mongoose.model('Run', runsSchema);

module.exports = Run;

module.exports.get = function (callback, limit) {
    Run.find(callback).limit(limit); 
 }

module.exports.getHitlist = function (month, callback) {
  
  monthInt = parseInt(month);
  nextMonthInt = monthInt + 1;
  monthString = monthInt.toString().padStart(2, '0');
  nextMonthString = nextMonthInt.toString().padStart(2, '0');
    
  Run.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date('2021-' + monthString + '-01'),
            $lt:  new Date('2021-' + nextMonthString + '-01')
          }
        }
      },

      {
        $group:
        {
          _id: { name: "$name", url: "$url" },
          totalAmount: { $sum: "$distance" },
          //totalAmount: { $sum: { $round: [ "$distance", 2 ] } }, (rundet die Einzelzahlen, wenn dann das Endergebnis runden)
          count: { $sum: 1 },

        }
      },
      { $sort: { "totalAmount": -1 } }
    ],
    callback);
}