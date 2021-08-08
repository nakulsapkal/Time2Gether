CREATE TABLE messages (
	ID SERIAL PRIMARY KEY,
	text varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now()
);