const express = require("express");
const router = express.Router();

module.exports = (db) => {
	router.get("/promotions", (req, res) => {
		db.query(
			`SELECT * FROM promotions
       ORDER BY start_date asc;`
		)
			.then((data) => {
				res.json({ promotions: data.rows });
			})
			.catch((err) => {
				console.log("Error from get promotions route: ", err);
			});
	});

	router.post("/promotions/create", (req, res) => {
		const { title, start_date, end_date, details, promo_code, user_id } =
			req.body.body;

		db.query(
			`INSERT INTO promotions (title, start_date, end_date, details, promo_code, business_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[title, start_date, end_date, details, promo_code, user_id]
		)
			.then((data) => {
				res.json({ promotions: data.rows });
			})
			.catch((err) => {
				console.log("Error from post promotions route: ", err);
			});
	});

	return router;
};
