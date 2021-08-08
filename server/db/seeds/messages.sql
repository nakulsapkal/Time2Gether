INSERT INTO messages (text, username, created_at)
VALUES('Hey How are you?', 'Nakul', now()),
	('Hey How are you?', 'Pranav', now()),
	('Hey How are you?', 'Akshaya', now()),
	('Hey How are you?', 'Sheetal', now())
returning *;