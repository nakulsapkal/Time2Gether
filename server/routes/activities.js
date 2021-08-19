const express = require("express");
const router = express.Router();

module.exports = (db) => {
	//fetch all activities
	router.get("/activities", (req, res) => {
		db.query(
			`SELECT activities.*, address.street_number, address.street_name, address.city, address.province, address.postal_code, categories.name as category from activities
       JOIN address ON address.id = activities.address_id
       JOIN categories ON activities.category_id = categories.id
       WHERE  start_date > now()
       ORDER BY start_date asc;`
		)
			.then((data) => {
				res.json({ activities: data.rows });
			})
			.catch((err) => {
				console.log("Error from get activities route: ", err);
			});
	});

	//fetch all activities for user combined with user activity,address and categories tables
	router.get("/userActivities", (req, res) => {
		db.query(
			`SELECT user_activity.id AS user_activity_id,joined_at,favourite,user_activity.user_id,title,activity_id,created_at,start_date,end_date,start_time,end_time,img,details,address_id,street_number,street_name,city,province,postal_code,category_id,categories.name as category from user_activity
      JOIN activities ON user_activity.activity_id = activities.id
      JOIN address ON  activities.address_id = address.id
      JOIN categories ON activities.category_id = categories.id
			WHERE activities.created_at IS NOT NULL;`
		)
			.then((result) => {
				res.json({ userActivities: result.rows });
			})
			.catch((err) => {
				console.log("Error from get userActivities route: ", err);
			});
	});

	router.post("/activities/create", (req, res) => {
		const {
			title,
			img,
			details,
			category,
			start_date,
			end_date,
			start_time,
			end_time,
			street_number,
			street_name,
			city,
			province,
			postal_code,
			user_id,
		} = req.body.body;

		const categoryList = {
			1: "Physical",
			2: "Mental",
			3: "Social",
			4: "Leisure",
			5: "Occupational",
		};

		const categoryId = Object.keys(categoryList).find(
			(c) => categoryList[c] == category
		);

		db.query(
			`INSERT INTO address (street_number, street_name, city, province, postal_code)

      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
			[street_number, street_name, city, province, postal_code]
		)
			.then((data) => {
				const address_id = data.rows[0].id;

				db.query(
					` INSERT INTO activities 
            (title,img, details, category_id, created_at,
            start_date, end_date, start_time, end_time, address_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *`,
					[
						title,
						img,
						details,
						categoryId,
						new Date().toISOString().slice(0, 10),
						start_date,
						end_date,
						start_time,
						end_time,
						address_id,
					]
				)
					.then((data1) => {
						const activity_id = data1.rows[0].id;
						db.query(
							` INSERT INTO user_activity 
              (user_id, activity_id, joined_at) 
    
              VALUES ($1, $2, $3) RETURNING *`,
							[user_id, activity_id, null]
						)
							.then((data2) => {
								res.json({
									address: data.rows[0],
									activity: data1.rows[0],
									user_activity: data2.rows[0],
								});
							})
							.catch((error) =>
								console.log(
									"Error inserting record into user_activity table: ",
									error
								)
							);
					})
					.catch((error) =>
						console.log("Error inserting record into activities table: ", error)
					);
			})
			.catch((error) =>
				console.log("Error inserting record into address table: ", error)
			);
	});

	router.put("/activities/edit", (req, res) => {
		const {
			title,
			img,
			details,
			loginUserId,
			category,
			start_date,
			end_date,
			start_time,
			end_time,
			street_number,
			street_name,
			city,
			province,
			postal_code,
		} = req.body.values;

		const { activity_id, address_id, category_id, created_at } =
			req.body.activityObj;

		db.query(
			`UPDATE address
			 SET 
				street_number=$1,
				street_name=$2,
				city=$3,
				province= $4,
				postal_code=$5
      WHERE 
				address.id = $6
      RETURNING *`,
			[street_number, street_name, city, province, postal_code, address_id]
		)
			.then((data) => {
				const address_id = data.rows[0].id;

				db.query(
					` UPDATE activities 
            SET 
							img= $1, details= $2, category_id= $3, created_at= $4,
							start_date= $5, end_date= $6, start_time= $7, end_time= $8, address_id= $9, title=$10
            WHERE 
							activities.id = $11 
						RETURNING *`,
					[
						img,
						details,
						category_id,
						created_at,
						start_date,
						end_date,
						start_time,
						end_time,
						address_id,
						title,
						activity_id,
					]
				)
					.then((data1) => {
						res.json({
							//address: data.rows[0],
							//activity: data1.rows[0],
							//Updated: true,
						});
					})
					.catch((error) =>
						console.log("Error updating activities record: ", error)
					);
			})
			.catch((error) => console.log("Error updating address record: ", error));
	});

	return router;
};
