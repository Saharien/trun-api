Biking = require('./models/bikings.js');
Auth = require('./auth');

//For index
exports.index = function (req, res) {
    if(Auth.checkAuth(req, res)==false) {
        return;
    }
    Biking.get(function (err, biking) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Bikings Successfully!",
            data: biking       
        });
    });
};

//For hitlist
exports.hitlist = function (req, res) {
    if(Auth.checkAuth(req, res)==false) {
        return;
    }
    Biking.getHitlist(req.params.month, function (err, biking) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Biking Hitlist Successfully!",
            data: biking       
        });
    });
};

//For overview
exports.overview = function (req, res) {
    
    if(Auth.checkAuth(req, res)==false) {
        return;
    }
    
    Biking.getOverview(req.params.month, function (err, run) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got overview successfully.",
            data: run       
        });
    });
    
};

//For longest bikings
exports.longest = function (req, res) {
    
    if(Auth.checkAuth(req, res)==false) {
        return;
    }
    
    Biking.getLongest(req.params.month, function (err, run) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got longest bikings successfully.",
            data: run       
        });
    });
    
};