const express = require("express");
const router = express.Router();

module.exports = (db) => {
	router.get("/users", function (req, res, next) {
		db.query(`SELECT * from users;`)
			.then((result) => {
				res.json({ users: result.rows });
			})
			.catch((err) => {
				console.log("Error fetching users from table: ", err);
				res.json({ users: err });
			});
	});

	// Route to add a new user into the database
	router.post("/users/signup", function (req, res) {
		const { firstName, lastName, email, password } = req.body;
		db.query(
			`
      INSERT INTO users (first_name, last_name, email, password) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
			[firstName, lastName, email, password]
		)
			.then((data) => {
				res.json(data.rows[0]);
			})
			.catch((error) => console.log("Error in user signup: ", error));
	});

	// add a new "join" event to user-activity table
	router.post("/users/joined", (req, res) => {
		const { joined_at, user_id, activity_id } = req.body.body;

		db.query(
			`
      INSERT INTO user_activity (joined_at, user_id, activity_id) 
      VALUES ($1, $2, $3)
      RETURNING *`,
			[joined_at, user_id, activity_id]
		)
			.then((data) => {
				res.json(data.rows);
				console.log(data.rows[0]);
			})
			.catch((error) =>
				console.log("Error inserting joined data in user_activity: ", error)
			);
	});

	// cancel a "join" event to user-activity table
	router.put("/users/joined", (req, res) => {
		const { joined_at, user_id, activity_id } = req.body.body;
		//if joined_at is falsy, user cancelled, want to rejoin, insert current time
		if (joined_at) {
			db.query(
				`UPDATE user_activity 
        SET joined_at = $1
        WHERE user_id = $2
        AND activity_id = $3
        RETURNING *`,
				[new Date().toISOString().slice(0, 10), user_id, activity_id]
			)
				.then((data) => {
					res.json(data.rows[0]);
				})
				.catch((error) =>
					console.log("Error updating joined data in user_activity: ", error)
				);
			//if true, joined, user want to cancel, set this record to null
		} else {
			db.query(
				`UPDATE user_activity 
        SET joined_at = NULL
        WHERE user_id = $1
        AND activity_id = $2
        RETURNING *`,
				[user_id, activity_id]
			)
				.then((data) => {
					res.json(data.rows[0]);
					console.log(data.rows[0]);
				})
				.catch((error) =>
					console.log("Error updating joined data in user_activity: ", error)
				);
		}
	});

	// add a "Favourite" event to user-activity table
	router.post("/users/faved", (req, res) => {
		const { favStatus, user_id, activity_id } = req.body.body;

		db.query(
			`INSERT INTO user_activity (joined_at, favourite, user_id, activity_id) 
        VALUES (NULL, TRUE, $1, $2)
        RETURNING *`,
			[user_id, activity_id]
		)
			.then((data) => {
				res.json(data.rows);
			})
			.catch((error) =>
				console.log("Error inserting record in user_activity: ", error)
			);
	});

	// cancel a "Favourite" event to user-activity table
	router.put("/users/faved", (req, res) => {
		const { favStatus, user_id, activity_id } = req.body.body;

		db.query(
			`UPDATE user_activity 
        SET favourite = $1
        WHERE user_id = $2
        AND activity_id = $3
        RETURNING *;`,
			[favStatus, user_id, activity_id]
		)
			.then((data) => {
				res.json(data.rows[0]);
			})
			.catch((error) =>
				console.log("Error updating favourite data in user_activity: ", error)
			);
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
