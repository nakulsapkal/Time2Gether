const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/messages/create", (req, res) => {
    const {receiverId, senderId, content, readStatus, conversationId} = req.body;

    // if conversation exist, insert the new msg
    if(conversationId) {

      db.query(
        `INSERT INTO messages (senderId, content, readStatus, conversationId)
        
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [senderId, content, readStatus, conversationId]
        ).then(data => {
          res.json( data.rows[0])
        }).catch(error => console.log(error));
      
    } else {
      // if two users has no previous conversation(null), create one and then insert new msg
      db.query(
        `INSERT INTO conversations(user1Id, user2Id)
        VALUES ($1, $2) returning *`,[senderId, receiverId]
        ).then(data => {
          db.query(
            `INSERT INTO messages (senderId, content, readStatus, conversationId, created_at)
            
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [senderId, content, readStatus, conversationId, new Date()]
        )
      }).then(data1 => {
        res.json( data.rows[0])
      }).catch(error => console.log(error));
    }
  })


  return router;
};