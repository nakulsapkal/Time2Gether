const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // router.post("/login", function (req, res) {
  //   const email = req.body.email;
  //   const password = req.body.password;

  //   db.query("SELECT * FROM users WHERE email = $1 AND password = $2;", [
  //     email,
  //     password,
  //   ])
  //     .then((result) => {
  //       if (result.rows[0]) {
  //         //res.cookie("user", result.rows[0]);
  //         res.json({ user: res.cookie("user", result.rows[0]) });
  //       } else {
  //         message = "Invalid Login";
  //         res.json({ user: message });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error:", err);
  //       res.json({ user: err });
  //     });
  // });

  router.get("/users", function (req, res, next) {
    console.log("Index Router File:", db);
    db.query(`SELECT * from users;`)
      .then((result) => {
        console.log("DB Users seeds : ", result.rows);
        res.json({ users: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ users: err });
      });
  });
  return router;
};
