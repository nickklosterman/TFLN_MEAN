var models = require('../models');

exports.index = function( req, res, index) {
    //I reall just want to serve the static home page
    res.send("home page");
};
