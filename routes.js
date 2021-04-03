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

//Export API routes
module.exports = router;