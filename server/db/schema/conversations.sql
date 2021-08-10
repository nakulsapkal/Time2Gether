DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
	id SERIAL PRIMARY KEY,
	user1Id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	user2Id INTEGER REFERENCES users(id) ON DELETE CASCADE
);