const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/business/users", function (req, res, next) {
    //console.log("Business database:", db);
    db.query(`SELECT * from business_users;`)
      .then((result) => {
        res.json({ businessUsers: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ businessUsers: err });
      });
  });

  // Route to add a new Business user into the database
  router.post("/users/signup", function (req, res) {
    //console.log("This is business user data from business_users.js", customData.first_name);
    const { businessName, ownerName, registrationNumber, email, phoneNumber, password } = req.body;
    db.query(
      `
      INSERT INTO users (business_name, owner_name, email, password, registration_number, phone_number) 
      VALUES ($1, $2, $3, $4, $5, $6)`, [businessName, ownerName, email, password, registrationNumber,phoneNumber]
    )
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(error => console.log(error));
  })
  return router;
};
