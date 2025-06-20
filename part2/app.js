/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
var session = require('express-session');
require('dotenv').config();
var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'DogWalkService'
});

const app = express();

// Middleware
app.use(express.json());

app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

// sessions
app.use(session({
  secret: 'evilwebsite',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // session expires after 1 hour
}));

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const indexRouter = require('./routes/index');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/', indexRouter);

// Export the app instead of listening here
module.exports = app;

var express = require('express');
var multer = require('multer');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// require mysql
var mysql = require('mysql');
const { connect } = require('http2');
const { stringify } = require('querystring');

// setup pool to connect to mySQL server
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'forecastfashion'
});

var app = express();

// middleware to access database
app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// sessions
app.use(session({
    secret: 'evilwebsite',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // session expires after 1 hour
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;