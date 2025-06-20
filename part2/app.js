/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
require('dotenv').config();
var mysql = require('mysql2/promise');

var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'forecastfashion'
});

const app = express();

// Middleware
app.use(express.json());



app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});


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