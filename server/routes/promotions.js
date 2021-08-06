const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all promotions
  router.get("/promotions", (req, res) => {
    console.log("Promotions Router:", db);
    db.query(
      `SELECT * FROM promotions
       ORDER BY start_date asc;`
    )
      .then(data => {
        res.json({ promotions: data.rows });
      })
      .catch((err) => {
        console.log("Error from promotions route: ", err);
      });
  });

  return router;
};
