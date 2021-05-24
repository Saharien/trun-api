//index.js

const CREDENTIALS = require('./credentials');
let express = require('express')
let apiRoutes = require("./routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let fs = require('fs');
let https = require('https');
let path = require('path');

const privateKey = fs.readFileSync(path.resolve(__dirname, 'sslcert/privkey.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, 'sslcert/cert.pem'), 'utf8');
const ca = fs.readFileSync(path.resolve(__dirname, 'sslcert/chain.pem'), 'utf8');

var creds = { key: privateKey, cert: certificate, ca: ca };

let app = express();

// Um Probleme mit Chrome CORS Policy zu vermeiden
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'pass,Authorization');
    return next();
});

//app.get('/', (req, res) => res.send('Welcome to Express'));

// Use API routes in the App
app.use('/api', apiRoutes);

// https-Server in /
app.use('/', express.static('/home/trun/trun-api/static'));

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
});


var viaHttps = true;

if (viaHttps === true) {
    var httpsServer = https.createServer(creds, app);
    httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
} else {
    var port = process.env.PORT || 80;
    app.listen(port, function () {
        console.log("Running trun-api on Port " + port);
    })
}