const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// sessions
app.use(session({
    secret: 'evilwebsite',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // session expires after 1 hour
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const indexRouter = require('./routes/index');

app.get('/api/dogs', async (req, res) => {
    try {
    const [dogs] = await db.execute('SELECT d.dog_id, d.name, d.size FROM Dogs d INNER JOIN Users u ON d.owner_id = u.user_id;');
    res.json(dogs);
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
    }
});

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/', indexRouter);

// Export the app instead of listening here
module.exports = app;