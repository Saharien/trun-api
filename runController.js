Run = require('./models/runs.js');

//For index
exports.index = function (req, res) {
    Run.get(function (err, run) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Run Successfully!",
            data: run       
        });
    });
};