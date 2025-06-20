var express = require('express');
var router = express.Router();
// login to account
router.post('/login', function(req, res, next) {
  // connect to db
  req.pool.getConnection(function(err, connection) {
      if (err) {
      res.sendStatus(500);
      return;
      }

      var query = "SELECT username, role FROM Users WHERE username = ? && password_hash = ?";

      connection.query(query, [req.body.uname, req.body.pwd], function(err2, rows, fields) {
        connection.release();
          if (err2) {
              res.sendStatus(500);
              return;
          }

          const count = rows[0]['COUNT(*)'];

          if (count > 0){
            req.session.user = req.body.uname;
            res.send("correct");
          } else {
            res.send("incorrect");
          }
      });
  });
});

module.exports = router;
