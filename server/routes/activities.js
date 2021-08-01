const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all activities 
  router.get("/activities", (req, res) => {
    console.log("Activity Router:", db);
    db.query(`SELECT * from activities;`)
      .then((result) => {
        res.json({ activities: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        // res.json({ users: err });
      });
  });

  return router;
};
