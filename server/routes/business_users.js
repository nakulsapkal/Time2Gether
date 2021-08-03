const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/business/users", function (req, res, next) {
    //console.log("Business database:", db);
    db.query(`SELECT * from business_users;`)
      .then((result) => {
        res.json({ businessUusers: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ businessUsers: err });
      });
  });
  return router;
};
