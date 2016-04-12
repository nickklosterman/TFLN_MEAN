var mongoose = require('mongoose'),
    config = require('../config/development');//hmm this was working automagically pulling in the right config based on the environmnet variable.
console.log(config.db.uri);
var Models = function() {

    console.log("it doesn't appear that mongoose is being started here. Had to add it in to app.js.");
    if ( mongoose.connection.readystate === 0 ) {
	mongoose.connect(config.db.uri);
	console.log('mongoose connected');
    } 
    this.Text = mongoose.model('Text', require('./text'));
}

module.exports = new Models();
