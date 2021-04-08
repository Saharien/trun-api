//index.js

const CREDENTIALS = require('./credentials');
let express = require('express')
let apiRoutes = require("./routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
var port = process.env.PORT || 80;

// Um Probleme mit Chrome CORS Policy zu vermeiden
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'pass');
    return next();
});

app.get('/', (req, res) => res.send('Welcome to Express'));

app.listen(port, function () {
    console.log("Running trun-api on Port " + port);
})

// Use API routes in the App
app.use('/api', apiRoutes);

// Configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

mongo = mongoose.connect(CREDENTIALS.dburl, { useNewUrlParser: true, useUnifiedTopology: true, user: CREDENTIALS.dbuser, pass: CREDENTIALS.dbpass, authSource: 'admin' });

mongo.then(() => {
    console.log('Connected to mongodb');
}, error => {
    console.log(error, 'Error when connecting to mongodb');
})



