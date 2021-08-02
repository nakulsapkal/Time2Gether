const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all activities 
  router.get("/activities", (req, res) => {
    // console.log("Activity Router:", db);
    db.query(`SELECT activities.*,address.*, categories.name as category from address
    join activities ON address_id = address.id
    join categories ON activities.category_id = categories.id;`)
      .then((result) => {
        console.log("Activities records : ", result.rows);
        res.json({ activities: result.rows });
      })
      .catch((err) => {
        console.log("Error from activities route: ", err);
      });
  });



  return router;
};
