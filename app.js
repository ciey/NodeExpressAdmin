/****************************************************************************************
 * app.js
 * Node.js >= 8.0.0
 * database	: mysql, redis
 * server   : ubuntu 16.04 / nginx
 ***************************************************************************************/
'use strict';
const _ = require('lodash');
const path = require('path');
const config = require('./config');
const express = require('express');
require('express-async-errors');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const moment = require('moment');
const logger = require('./common/logger');
const requestLog = require('./middleware/requestLog');
const router = require('./router');

const app = express();
// view engine setup
app.engine('ejs', require('ejs-mate'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// server static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/upload/public', express.static(path.join(__dirname, 'upload/public')));
// log4js
app.use(require('log4js').connectLogger(logger, { level: config.debug ? 'DEBUG' : 'ERROR' }));

// Request logger
app.use(requestLog);

// parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());

// session support redis store
app.use(session({
    store: new redisStore(config.redis),
    resave: true,
    saveUninitialized: false,
    secret: config.session_secret
  }));

// locals
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.moment = moment;
  res.locals.site = config.site;
    next();
  });
  
// routes
app.use('/', router);

// error handle
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  if (req.xhr) {
    return res.json({
      state: false,
      msg: err.message
    });
  }
  //return res.send(err.message);
  next(err);
});

app.listen(config.port,() => {
    logger.info('server listening on port：' + config.port);
})