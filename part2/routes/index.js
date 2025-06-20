var express = require('express');
const db = require('../models/db');
var router = express.Router();

// login to account
router.post('/login', async (req, res) => {
  const { uname, pwd } = req.body;

  // make query
  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [uname, pwd]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // assign session variables
    req.session.user = rows[0].user_id;
    req.session.role = rows[0].role;

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// logout
router.post('/logout', function(req, res, next) {
  req.session.user = null;
  req.session.role = null;
  res.send();
});

router.get('/api/dogs', async (req, res) => {
  // make query
  try {
    const [rows] = await db.query(`
      SELECT dog_id, dog_name FROM Dogs
      WHERE owner_id = ?
    `, [req.session.user]);

    if (rows.length === 0) {
      return res.send();
    }

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
