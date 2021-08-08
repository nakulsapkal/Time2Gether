const express = require("express");
const router = express.Router();

module.exports = (db) => {
	router.getMessages = (request, response) => {
		db.query(
			"SELECT * FROM messages ORDER BY id DESC LIMIT 10",
			(error, results) => {
				if (error) {
					throw error;
				}
				response.status(200).json(results.rows);
			}
		);
	};

	router.createMessage = (request, response) => {
		//const { text, username } = request.body;
		db.query(
			"INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING text, username, created_at",
			[text, username],
			(error, results) => {
				console.log("Result", results);
				if (error) {
					throw error;
				}
				response.status(201).send(results.rows);
			}
		);
		// 	const { text, username } = req.body;
		//res.status(200).send({ text, username });
	};

	router.getSocketMessages = () => {
		//const text = "hello";
		return new Promise((resolve) => {
			db.query(
				"SELECT * FROM messages ORDER BY id DESC LIMIT 10",
				(error, results) => {
					if (error) {
						throw error;
					}
					resolve(results.rows);
				}
			);
		});
		//return text;
	};
	router.createSocketMessage = (message) => {
		return new Promise((resolve) => {
			db.query(
				"INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING text, username, created_at",
				[message.text, message.username],
				(error, results) => {
					if (error) {
						throw error;
					}
					resolve(results.rows);
				}
			);
		});
	};

	return router;
};

// const getMessages = (request, response) => {
// 	db.query("SELECT first_name FROM users", (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).json(results.rows);
// 	});
// };

// const createMessage = (request, response) => {
// 	const { text, username } = request.body;
// 	// pool.query(
// 	// 	"INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING text, username, created_at",
// 	// 	[text, username],
// 	// 	(error, results) => {
// 	// 		if (error) {
// 	// 			throw error;
// 	// 		}
// 	// 		response.status(201).send(results.rows);
// 	// 	}
// 	// );
// 	// 	// 	const { text, username } = req.body;
// 	res.status(200).json({ text, username });
// };

// const getSocketMessages = (db) => {
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
// };
// const createSocketMessage = (message) => {
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

// module.exports = {
// 	getMessages,
// 	createMessage,
// 	getSocketMessages,
// 	createSocketMessage,
// };
