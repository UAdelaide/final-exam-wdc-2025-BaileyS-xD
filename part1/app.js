var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
/*
    // insert users
    await db.execute(`INSERT INTO Users (username, email, password_hash, role) VALUES
    ('alice123', 'alice@example.com', 'hashed123', 'owner'),
    ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
    ('carol123', 'carol@example.com', 'hashed789', 'owner'),
    ('johnsmith', 'john@example.com', 'passhash', 'walker'),
    ('janesmith', 'jane@example.com', 'passhashedagain', 'walker');`);

    // insert dogs
    await db.execute(`INSERT INTO Dogs (owner_id, name, size) VALUES
    ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
    ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
    ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Benji', 'large'),
    ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bobby', 'medium'),
    ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Bucky', 'medium');`);

    // insert requests
    await db.execute(`INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
    ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', '30', 'Parklands', 'open'),
    ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', '45', 'Beachside Ave', 'accepted'),
    ((SELECT dog_id FROM Dogs WHERE name = 'Benji'), '2025-06-11 10:30:00', '25', 'Adelaide', 'open'),
    ((SELECT dog_id FROM Dogs WHERE name = 'Bobby'), '2025-06-12 09:30:00', '60', 'Semaphore', 'open'),
    ((SELECT dog_id FROM Dogs WHERE name = 'Bucky'), '2025-06-10 09:30:00', '45', 'Grange', 'accepted');`);
    */
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

// Route to return dogs as JSON
app.get('/api/dogs', async (req, res) => {
    try {
    const [dogs] = await db.execute('SELECT d.name AS dog_name, d.size, u.username AS owner_username FROM Dogs d INNER JOIN Users u ON d.owner_id = u.user_id;');
    res.json(dogs);
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
    }
});

// route to return open walk requests
app.get('/api/walkrequests/open', async (req, res) => {
    try {
        const [open] = await db.execute(`SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username FROM WalkRequests wr INNER JOIN Dogs d ON wr.dog_id = d.dog_id INNER JOIN Users u ON d.owner_id = u.user_id WHERE wr.status = 'open';`);
        res.json(open);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
});

// route to return a summary of walkers with their ratings
app.get('/api/walkers/summary', async (req, res) => {
    try {
        const [open] = await db.execute(
            `SELECT u.username AS walker_username, COUNT(r.rating_id) AS total_ratings, AVG(r.rating) AS average_rating, COUNT(DISTINCT CASE WHEN wr.status = 'completed' AND wa.status = 'accepted' THEN wr.request_id)`
        );
        res.json(open);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
