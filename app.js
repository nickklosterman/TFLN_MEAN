/*
  app.js - node server
*/
/* jslint
   node: true, continue: true, devel: true, indent ; 2, maxerr: 50, newcap : true, nomen: true, plusplus: true, regexp : true, sloppy : true, vars : false, white: true
*/
/* global*/
'use strict';

var http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    server = http.createServer(app),
    packageJSON = require('./package.json'),
    //    routes = require('./lib/routes'),
    port = process.env.PORT || 8080,
    env = process.env.NODE_ENV || 'development';

console.log('\ninitializing ' + packageJSON.name + ' (' + env + ')');

// expose application properties to views
app.set('env',env);
app.set('name',packageJSON.name);
app.set('version',packageJSON.version);


//  BEGIN SERVER CONFIGURATION 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//all of this stuff is order dependent. If we had a static file that matched the api url format then the static file would be served as long as the express.static is first. If the router was first then the api call would be hit. To prevent this it is best to have a root named 'api/1.0.0' etc to prevent those cases from happening
app.use( express.static( __dirname + '/public' ));
//app.use( app.router );

if ( 'development' == env) {
    app.use( logger('combined') );
    app.use( errorHandler({
	dumpExceptions: true,
	showStack : true}));
} else if ( 'production' == env ) {
    app.use( errorHandler() );
}

//routes.configRoutes(app,server)

//  END SERVER CONFIGURATION 
server.listen(port);

//this is shitty. if there is another node http server running, then it will state that server.address() has an error bc address isn't a function of undefined. this is all because there was a port collision when trying to initialize the server. So the whole thing fails without much indication :(
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);

