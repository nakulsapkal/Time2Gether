const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all categories 
  router.get("/categories", (req, res) => {
    // console.log("Activity Router:", db);
    db.query(`SELECT * from categories;`)
      .then((result) => {
        console.log("categories records : ", result.rows);
        res.json({ categories: result.rows });
      })
      .catch((err) => {
        console.log("Error from categories route: ", err);
      });
  });



  return router;
};