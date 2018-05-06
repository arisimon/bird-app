'use strict';

const express = require('express');
const fs = require('fs')
const path = require('path');
const exphbs  = require('express-handlebars');
const logger = require('morgan');
const bodyParser = require('body-parser');

//import configuration files
const {PORT, DATABASE_URL } = require('./configs');
const { Observation } = require('./models');

//Import the mongoose module
const mongoose = require('mongoose');
//Set up default mongoose connection
const mongoDB = 'mongodb://ari:ari@ds113640.mlab.com:13640/birds';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//create the express application
const app = express();

//set bodyParser
app.use(bodyParser.json());

// set morgan to log only 4xx and 5xx responses to console
app.use(logger('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// set morgan to log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))


//require routers
const indexRouter = require('./routes/index');
const speciesRouter = require('./routes/species');
const observationRouter = require('./routes/observations');


//set up view engine - express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//serve static assets
app.use(express.static('public'));


//serve routers
app.use('/', indexRouter);
app.use('/api/species', speciesRouter);
app.use('/observations', observationRouter);
app.use('*', function (req, res) {
	res.status(404).json({ message: 'Not Found' });
});



let server;

//run server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your server is running on ${port}`);
				resolve();
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

// close server, return promise
function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
};

//if server is called directly
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = app; 