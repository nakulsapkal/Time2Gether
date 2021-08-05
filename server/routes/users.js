const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/users", function (req, res, next) {
    //console.log("Index Router File:", db);
    db.query(`SELECT * from users;`)
      .then((result) => {
        // console.log("DB Users: ", result.rows);
        res.json({ users: result.rows });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.json({ users: err });
      });
  });

  // Route to add a new user into the database
  router.post("/users/signup", function (req, res) {
    //console.log("This is customData from users.js", customData.first_name);
    const { firstName, lastName, email, password } = req.body;
    db.query(
      `
      INSERT INTO users (first_name, last_name, email, password) 
      VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, email, password]
    )
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((error) => console.log(error));
  });

  //Delete an activity for user
  router.delete("/user/activity/:id", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    db.query(`DELETE FROM activities WHERE activities.id =$1::integer`, [
      request.params.id,
    ])
      .then((data) => {
        response.status(200).json({});
      })
      .catch((err) => console.error("Error deleting data at backend: ", err));
  });

  return router;
};
