const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all activities
  router.get("/activities", (req, res) => {
    // console.log("Activity Router:", db);
    db.query(
      `SELECT user_activity.id AS user_activity_id,joined_at,favourite,user_id,activity_id,created_at,start_date,end_date,start_time,end_time,img,details,address_id,street_number,street_name,city,province,postal_code,category_id,categories.name as category from user_activity
      JOIN activities ON activities.id = user_activity.activity_id
      JOIN address ON address.id = activities.address_id
      JOIN categories ON activities.category_id = categories.id;`
    )
      .then((result) => {
        console.log("One Activity record from activities:", result.rows[0]);
        res.json({ activities: result.rows });
      })
      .catch((err) => {
        console.log("Error from activities route: ", err);
      });
  });

  return router;
};
