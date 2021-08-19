const express = require("express");
const router = express.Router();

module.exports = (db) => {
	router.post("/messages/create", (req, res) => {
		const { senderid, content, activity_id, created_at, senderemail } =
			req.body;
		db.query(
			`INSERT INTO messages (senderId, content, activity_id, created_at, senderEmail)
	      VALUES ($1, $2, $3, $4,$5) RETURNING *`,
			[senderid, content, activity_id, created_at, senderemail]
		)
			.then((data) => {
				console.log(
					"New message record created for activity **************",
					data.rows
				);
				res.json(data.rows[0]);
			})
			.catch((error) =>
				console.log(
					"Error While inserting Message from user for activity:",
					error
				)
			);
	});

	// get all conversations for 2 users, including 10 messages for preview
	router.get("/messages/:id", (req, res, next) => {
		db.query(
			`SELECT * FROM messages
			WHERE activity_id = $1`,
			[req.params.id]
		)
			.then((data) => {
				if (data) {
					console.log(
						"Messages For activity **************",
						req.params.id,
						data.rows
					);
					res.json(data.rows);
				} else {
					res.status(404).json({});
				}
			})
			.catch((err) => {
				console.log("Error While Fetching Messages for activity:", err);
			});
	});

	return router;
};
