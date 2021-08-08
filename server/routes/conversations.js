const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // get all conversations for 2 users, including 10 messages for preview
  router.get("/conversations", (req, res, next) => {
    const { user_id, participant_id } = req.body;
    db.query(
      `SELECT messages.*, 
      id as conv_id, conv_user1Id, conv_user2Id from conversations c
      JOIN messages m ON c.id = messages.conversationId
      JOIN users ON users.id = $1
      WHERE $2 in (conv_user1Id, conv_user2Id) limit 10
      ORDER BY m.created_at desc`, [user_id, participant_id]
      )
      .then((data) => {
        if(data){
          res.json({ conversations: data.rows });
        }
        res.sendStatus(404)
        
      })
      .catch((err) => {
        console.log("Error:", err);
      
      });
  });

return router;
};
