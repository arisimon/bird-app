'use strict';

const express = require('express');
const fs = require('fs')
const path = require('path');
const exphbs  = require('express-handlebars');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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


//set up view engine - express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//serve static assets
app.use(express.static('public'));


//serve routers
app.use('/', indexRouter);
app.use('/species', speciesRouter);

//
const {PORT, DATABASE_URL} = require('./configs');


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
  app.listen(process.env.PORT || 8080, function () {
    console.info(`Server started on ${this.address().port}`);
  });
}

module.exports = app; 