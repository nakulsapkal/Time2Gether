const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all activities 
  router.get("/address", (req, res) => {
    // console.log("Activity Router:", db);
    db.query(`SELECT * from address;`)
      .then((result) => {
        console.log("Address records : ", result.rows);
        res.json({ address: result.rows });
      })
      .catch((err) => {
        console.log("Error from address route: ", err);
      });
  });



  return router;
};