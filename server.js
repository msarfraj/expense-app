var express  = require('express');
var session  = require('express-session');
var connect = require('connect');
var favicon = require('serve-favicon');
var path    = require('path');
var app      = express();
var port     = process.env.PORT || 5000;
var cookieParser = require('cookie-parser');
// Configuration
app.use(cookieParser());
app.use(session({
	secret: 'ssshhhhh',
	resave: true,
    saveUninitialized: true,
    cookieName: 'session',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    ephemeral: true
}));
app.use(favicon(__dirname + '/public/media/img/sapeicon.jpg'));
app.use(express.static(__dirname + '/public/media/'));
app.use(express.static(__dirname + '/views/html/ejs'));
app.set('views','./views/html/ejs');
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
	  res.locals.request = req;
	  next();
	});
require('./routes/routes.js')(app);
 
app.listen(port);
 
console.log('The App runs on port ' + port);