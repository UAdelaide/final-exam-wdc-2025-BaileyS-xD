/* eslint-disable linebreak-style */
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var walkRoutes = require('./routes/walkRoutes');
var userRoutes = require('./routes/userRoutes');

// require mysql
var mysql = require('mysql');
const { connect } = require('http2');
const { stringify } = require('querystring');

// setup pool to connect to mySQL server
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'DogWalkService'
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

app.use('/', indexRouter);
app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

module.exports = app;