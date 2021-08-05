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

  // router.get("/user/joineded", (req, res) => {
  //   db.query( `SELECT * FROM user_activity;`
  //     ).then(data => {
  //       res.json(data.rows[0]);
  //     }).catch(error => console.log(error));
  // })

  // add a new "join" event to user-activity table
  router.post("/users/joined", (req, res) => {
    const { joined_at, user_id, activity_id } = req.body.body;
    console.log("joined data ******************", req.body.body) 
    // console.log("user_id******************",values.user_id) 
    // console.log("activity_id******************",values.activity_id) 

    db.query( `
      INSERT INTO user_activity (joined_at, user_id, activity_id) VALUES ($1, $2, $3)
      RETURNING *`, [new Date(), user_id, activity_id]
      // .toISOString().slice(0, 10)
    ).then(data => {
          res.json(data.rows);
        }).catch(error => console.log(error));
  })

  // cancel a "join" event to user-activity table
  router.put("/users/joined", (req, res) => {
    const { user_id, activity_id } = req.body.body;

    db.query( `DELETE FROM user_activity 
      WHERE user_id = $1
      AND activity_id = $2
      RETURNING *`, [user_id, activity_id]
    ).then(data => {
          res.json(data.rows[0]);
        }).catch(error => console.log(error));
  })



  return router;
};
