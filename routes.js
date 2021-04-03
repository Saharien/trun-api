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

// Run routes
router.route('/run')
  .get(runController.index);

router.route('/run/hitlist/:month')
  .get(runController.hitlist);

// Run routes
router.route('/biking')
  .get(runController.index);

router.route('/biking/hitlist/:month')
  .get(runController.hitlist);  

//Export API routes
module.exports = router;