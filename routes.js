//routes.js

//initialize express router
let router = require('express').Router();

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://trun.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'trun',
  issuer: [`https://trun.eu.auth0.com/`],
  algorithms: ['RS256']
});

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
router.route('/run').get(checkJwt, runController.index);
router.route('/run/hitlist/:month').get(checkJwt, runController.hitlist);
router.route('/run/overview').get(checkJwt, runController.overview);
router.route('/run/longest').get(checkJwt, runController.longest);

// Bike routes
router.route('/biking').get(checkJwt, bikeController.index);
router.route('/biking/hitlist/:month').get(checkJwt, bikeController.hitlist);  
router.route('/biking/overview').get(checkJwt, bikeController.overview);
router.route('/biking/longest').get(checkJwt, bikeController.longest);

//Export API routes
module.exports = router;