DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  senderId INTEGER NOT NULL,
  senderEmail VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  -- readStatus BOOLEAN DEFAULT FALSE,
  created_at VARCHAR NOT NULL,
  -- conversationId INTEGER REFERENCES conversations(id) ON DELETE CASCADE
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE
);