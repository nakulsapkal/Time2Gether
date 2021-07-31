const express = require("express");
const router = express.Router();

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// module.exports = router;

module.exports = (db) => {
  router.get("/users", function (req, res, next) {
    console.log("Index Router File:", db);
    db.query(`SELECT * from users;`)
      .then((result) => {
        console.log("DB seeds : ", result.rows);
        res.json({ users: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ users: err });
      });
  });
  return router;
};
