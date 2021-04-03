Biking = require('./models/bikings.js');

//For index
exports.index = function (req, res) {
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