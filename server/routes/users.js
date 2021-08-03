const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/users", function (req, res, next) {
    //console.log("Index Router File:", db);
    db.query(`SELECT * from users;`)
      .then((result) => {
        //console.log("DB Users: ", result.rows);
        //console.log("This is from router.get in users.js. Server================ ")
        res.json({ users: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ users: err });
      });
  });

  router.post("/users/signup", function (req, res) {
    if ( !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      res.statusCode = 403;
      res.send("Status Code: 403");
    } else {
    //const customData = req.body;
    //console.log("This is customData from users.js", customData.first_name);
      const {firstName, lastName, email, password} = req.body;
      db.query(`SELECT * FROM users WHERE email = $1`, [email]).then(data => {
        if (data.rows.length !== 0) {
          res.json(data) = -1;
        } else {
          db.query(
          `
            INSERT INTO users (first_name, last_name, email, password) 
            VALUES ($1, $2, $3, $4)`, [firstName, lastName, email, password]
          )
            .then(data => {
            res.json(data.rows[0]);
          })
            .catch(error => console.log(error));
        }
      });
    }
  });

  return router;
};
