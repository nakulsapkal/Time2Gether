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
    //const customData = req.body;
    //console.log("This is customData from users.js", customData.first_name);
    console.log(req.body);
    const {firstName, lastName, email} = req.body;
    console.log("This is first name, last name and email", firstName, lastName, email);
    
    
    
    // db.query(
    //   `
    //   INSERT INTO users (first_name, last_name, email) 
    //   VALUES ($1, $2, $3)`, [firstName, lastName, email]
    // )
    
    //   .then((response) => {
       
    //     res.json({ users: response.rows });
    //   })
    //   .catch((err) => {
    //     console.log("Error:", err);
    //     res.json({ users: err });
    //   });
  });

  return router;


};
