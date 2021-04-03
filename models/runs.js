const mongoose = require('mongoose');

let runsSchema = new mongoose.Schema({
  url: String,
  timestamp: String,
  name: String,
  distance: Number,
  date: Date
});

let Run = mongoose.model('Run', runsSchema);

module.exports = Run;




// module.exports.get = function (callback, limit) {
//     Run.find(callback).limit(limit); 
//  }

module.exports.get = function (callback) {
  console.log(new Date('2021-04-01'));
  Run.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date('2021-04-01'),
            $lt:  new Date('2021-05-01')
          }
        }
      },

      {
        $group:
        {
          _id: { name: "$name" },
          totalAmount: { $sum: "$distance" },
          //totalAmount: { $sum: { $round: [ "$distance", 2 ] } }, (rundet die Einzelzahlen, wenn dann das Endergebnis runden)
          count: { $sum: 1 },

        }
      },
      { $sort: { "totalAmount": -1 } }
    ],
    callback);
}