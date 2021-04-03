Run = require('./models/runs.js');
Auth = require('./auth');

//For index
exports.index = function (req, res) {
    if(Auth.checkAuth(req, res)==false) {
        return;
    }
    Run.get(function (err, run) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Runs Successfully!",
            data: run       
        });
    });
};

//For hitlist
exports.hitlist = function (req, res) {
    if(Auth.checkAuth(req, res)==false) {
        return;
    }
    Run.getHitlist(req.params.month, function (err, run) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Hitlist Successfully!",
            data: run       
        });
    });
};