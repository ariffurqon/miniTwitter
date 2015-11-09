// server.js

// require express and other modules
var express = require('express'),
	app = express(),
	config = require('./config');
	bodyParser = require('body-parser'),  // for data from the request body
	mongoose = require('mongoose'),       // to interact with our db
	morgan = require('morgan');			  // to log request details

// connect to mongodb
mongoose.connect(config.database, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
}); 

//tell app to use bodyParser & morgan middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);


//set up root route to respond with 'hello lovers..'
app.get('/', function(req, res){
	res.send("hello lovers..");
});

// listen on port 3000
app.listen(config.port, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Listening on port 3000");
	}
});