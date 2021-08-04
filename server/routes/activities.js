const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //fetch all activities 
  router.get("/activities", (req, res) => {
    // console.log("Activity Router:", db);
    db.query(`SELECT activities.*,address.*, categories.name as category from address
    join activities ON address_id = address.id
    join categories ON activities.category_id = categories.id;`)
      .then((result) => {
        console.log("Activities records : ", result.rows);
        res.json({ activities: result.rows });
      })
      .catch((err) => {
        console.log("Error from activities route: ", err);
      });
  });

  router.post("/activities/create", (req, res) => {
    const {
      img, details, loginUserId, category,
      start_date, end_date, start_time, end_time,  
      street_number, street_name, city, province, postal_code
    } = req.body.body;
    // console.log("body content line 27",req.body.body)
 
    const categoryList = {1: "Outdoor sports", 2: "Baking", 3: "Indoor sports", 4: "Cooking"}

    const categoryId = Object.keys(categoryList).find(c => categoryList[c] == category);

    // console.log("categoryId: ", categoryId);

    db.query(
    
          `INSERT INTO address (street_number, street_name, city, province, postal_code)

          VALUES ($1, $2, $3, $4, $5) RETURNING *`, [street_number, street_name, city, province, postal_code]
        )
          .then(data => {
          // console.log("##############", data.rows[0].id)
          const address_id = data.rows[0].id;
          db.query(
            ` INSERT INTO activities 
              (img, details, user_id, category_id,
              start_date, end_date, start_time, end_time, address_id) 
    
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [img, details, loginUserId,categoryId, start_date, end_date, start_time, end_time, address_id]
          ).then(data1 => {
            res.json({address : data.rows[0], activities : data1.rows[0]});
          }).catch(error => console.log(error));
        
        })
          .catch(error => console.log(error));
    }
  );


  return router;
};
