/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
require('dotenv').config();
var mysql = require('mysql2/promise');


const app = express();

// Middleware
app.use(express.json());

var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'forecastfashion'
});

app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

let db;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Set your MySQL root password
    });

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
  } catch (err) {
    console.error('Error', err);
  }
})();


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