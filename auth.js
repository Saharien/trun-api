const CREDENTIALS = require('./credentials');

//For hitlist
exports.checkAuth = function (req, res) {
    if(req.headers.pass!=CREDENTIALS.apiPass) {
        res.json({
            status: "authentication error",
            message: "authentication error"
        });
        return(false);
    } else {
        return(true);
    }
};