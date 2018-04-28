'use strict';

const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const logger = require('morgan');

//require routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//set up view engine - express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//serve static assets
app.use(express.static('public'));

//serve routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.info(`Server started on ${this.address().port}`);
  });
}

module.exports = app; 