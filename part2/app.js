/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
require('dotenv').config();
var mysql = require('mysql2/promise');


const app = express();

// Middleware
app.use(express.json());

let db;

(async () => {
  try {
    // connect to the database
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