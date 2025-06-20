var express = require('express');
var router = express.Router();

router.post('/login', async (req, res) => {
    const { uname, pwd } = req.body;

    try {
      const [rows] = await db.query(`SELECT user_id, username, role FROM UsersWHERE username = ? AND password_hash = ?`, [uname, pwd]);

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful', user: rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
