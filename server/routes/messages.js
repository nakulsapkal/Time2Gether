const express = require("express");
const router = express.Router();

module.exports = (db) => {

	router.post("/messages/create", (req, res) => {
		const { receiverId, senderId, content, conversationId, createdAt } =
			req.body;
		// if conversation exist, insert the new msg
		if (conversationId) {
			db.query(
				`INSERT INTO messages (senderId, content, conversationId,created_at)
				
	      VALUES ($1, $2, $3, $4) RETURNING *`,
				[senderId, content, conversationId, createdAt]
			)
				.then((data) => {
					console.log("data.rows****************", data.rows);
					res.json(data.rows);
				})
				.catch((error) => console.log(error));
		} else {
			// if two users has no previous conversation(null), create one and then insert new msg
			db.query(
				`INSERT INTO conversations(user1Id, user2Id)
	      VALUES ($1, $2) returning *`,
				[senderId, receiverId]
			).then((data) => {
				db.query(
					`INSERT INTO messages (senderId, content, conversationId, created_at)
	      VALUES ($1, $2, $3, $4) RETURNING *`,
					[senderId, content, conversationId, new Date()]
				)
					.then((data1) => {
						res.json(data1.rows[0]);
					})
					.catch((error) => console.log(error));
			});
		}
	});

	// get all conversations for 2 users, including 10 messages for preview
	router.get("/messages/:id", (req, res, next) => {
		console.log("user in messages**************", req.params);

		db.query(
			`SELECT * FROM messages
			WHERE conversationId = $1`,
			[req.params.id]
		)
			.then((data) => {
				if (data) {
					console.log("data.rows", data.rows);
					res.json(data.rows);
				} else {
					res.status(404).json({});
				}
			})
			.catch((err) => {
				console.log("Error:", err);
			});
	});

	return router;
};