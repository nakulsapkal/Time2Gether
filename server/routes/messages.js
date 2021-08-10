const express = require("express");
const router = express.Router();

module.exports = (db) => {
	// router.getMessages = (request, response) => {
	// 	db.query(
	// 		"SELECT * FROM messages ORDER BY id DESC LIMIT 10",
	// 		(error, results) => {
	// 			if (error) {
	// 				throw error;
	// 			}
	// 			response.status(200).json(results.rows);
	// 		}
	// 	);
	// };

	// router.createMessage = (request, response) => {
	// 	//const { text, username } = request.body;
	// 	db.query(
	// 		"INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING text, username, created_at",
	// 		[text, username],
	// 		(error, results) => {
	// 			console.log("Result", results);
	// 			if (error) {
	// 				throw error;
	// 			}
	// 			response.status(201).send(results.rows);
	// 		}
	// 	);
	// 	// 	const { text, username } = req.body;
	// 	//res.status(200).send({ text, username });
	// };

	// router.getSocketMessages = () => {
	// 	//const text = "hello";
	// 	return new Promise((resolve) => {
	// 		db.query(
	// 			"SELECT * FROM messages ORDER BY id DESC LIMIT 10",
	// 			(error, results) => {
	// 				if (error) {
	// 					throw error;
	// 				}
	// 				resolve(results.rows);
	// 			}
	// 		);
	// 	});
	// 	//return text;
	// };
	// router.createSocketMessage = (message) => {
	// 	return new Promise((resolve) => {
	// 		db.query(
	// 			"INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING text, username, created_at",
	// 			[message.text, message.username],
	// 			(error, results) => {
	// 				if (error) {
	// 					throw error;
	// 				}
	// 				resolve(results.rows);
	// 			}
	// 		);
	// 	});
	// };

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
