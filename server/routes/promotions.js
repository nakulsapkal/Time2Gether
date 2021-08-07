const express = require("express");
const router = express.Router();

module.exports = (db) => {

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


  router.post("/promotions/create", (req, res) => {
    const {
      title,
      start_date,
      end_date,
      details,
      loginUserId,
    } = req.body.body;
     console.log("body content from route Promotions.js at backend server. Line 30",req.body.body);
    
    db.query(
      `INSERT INTO promotions (title, start_date, end_date, details, business_id)

      VALUES ($1, $2, $3, $4, $5) RETURNING *`, [title, start_date, end_date, details, loginUserId]
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
