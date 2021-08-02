const express = require("express");
const router = express.Router();

module.exports = (db) => {
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

  router.put("/users/signup", function (req, res, next) {
    const getData = () => {
      localStorage.getItem(req);
    }
  
    console.log("Data from signup route at backend:", getData());
    // db.query(`INSERT INTO users VALUES(
      
    // ))
    //   .then((result) => {
    //     console.log("DB Users seeds : ", result.rows);
    //     res.json({ users: result.rows });
    //   })
    //   .catch((err) => {
    //     console.log("Error:", err);
    //     res.json({ users: err });
    //   });
  });

  return router;


};
