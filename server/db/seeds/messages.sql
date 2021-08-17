INSERT INTO messages (
		senderId,
		content,
		readStatus,
		conversationId,
		created_at
	)
VALUES (
		1,
		'Hi, I really like your activity!',
		TRUE,
		1,
		CURRENT_TIMESTAMP
	),
	(
		2,
		'Thanks! Are you coming?',
		TRUE,
		1,
		CURRENT_TIMESTAMP
	),
	(
		1,
		'Absolutely! See you then.',
		TRUE,
		1,
		CURRENT_TIMESTAMP
	)
returning *;