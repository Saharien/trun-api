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
  
  if (month == 'S') {
    monthInt = 4;
    nextMonthInt = 7;
  } else {
    monthInt = parseInt(month);
    nextMonthInt = monthInt + 1;
  }
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
          count: { $sum: 1 },
        }
      },
      { $sort: { "totalAmount": -1 } }
    ],
    callback);
}

module.exports.getOverview = function (month, callback) {
    
  Run.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date('2021-04-01'),
            $lt:  new Date('2021-07-01')
          }
        }
      },

      {
        $group:
        {
          _id: { month: { $month: "$date" } },
          totalAmount: { $sum: "$distance" },
          count: { $sum: 1 },
        }
      },
      { $sort: { "_id.month": 1 } }
    ],
    callback);
}

module.exports.getLongest = function (month, callback) {
    
  Run.find(callback).sort('-distance').limit(10);
  
}