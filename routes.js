//routes.js

//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to T.RUN API'
    });
});

var runController = require('./runController');
var bikeController = require('./bikeController');

// Run routes
router.route('/run')
  .get(runController.index);

router.route('/run/hitlist/:month')
  .get(runController.hitlist);

// Run routes
router.route('/biking')
  .get(bikeController.index);

router.route('/biking/hitlist/:month')
  .get(bikeController.hitlist);  

//Export API routes
module.exports = router;