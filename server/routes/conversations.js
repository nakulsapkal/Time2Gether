const express = require("express");
const router = express.Router();

module.exports = (db) => {
	// get all conversations for 2 users, including 10 messages for preview
	router.get("/conversations/:id", (req, res, next) => {
		const indexOfD = req.params.id.indexOf("-");
		let user_id = req.params.id.slice(0, indexOfD);
		let participant_id = req.params.id.slice(
			indexOfD + 1,
			req.params.id.length
		);

		db.query(
			`SELECT messages.*, 
      conversations.id as conv_id, conversations.user1id as conv_user1Id, conversations.user2id as conv_user2Id from messages
      JOIN conversations ON conversations.id = messages.conversationId
      JOIN users ON users.id = $1
      WHERE $2 in (conversations.user1id, conversations.user2id) ORDER BY messages.created_at desc`,
			[user_id, participant_id]
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
