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
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const indexRouter = require('./routes/index');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/', indexRouter);

// Export the app instead of listening here
module.exports = app;

