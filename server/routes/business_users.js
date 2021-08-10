const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Route to get all business users
  router.get("/business/users", function (req, res, next) {
    db.query(`SELECT * from business_users;`)
      .then((result) => {
        console.log("One Business users record from business_users: ", result.rows[0]);
        res.json({ businessUsers: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ businessUsers: err });
      });
  });

  // Route to add a new Business user into the database
  router.post("/business/signup", function (req, res) {
    const { businessName, ownerName, registrationNumber, email, phoneNumber, password } = req.body;
    db.query(
      `
      INSERT INTO business_users (business_name, owner_name, email, password, registration_number, phone_number) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [businessName, ownerName, email, password, registrationNumber,phoneNumber]
    )
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(error => console.log(error));
  })
  return router;
};
