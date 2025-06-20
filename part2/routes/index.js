var express = require('express');
var path = require('path');
var router = express.Router();

// login to account
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const [rows] = await db.query(`
        SELECT user_id, username, role FROM Users
        WHERE username = ? AND password_hash = ?
      `, [email, password]);

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful', user: rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

module.exports = router;
