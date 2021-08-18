-- INSERT INTO messages (
-- 		senderId,
-- 		content,
-- 		readStatus,
-- 		conversationId,
-- 		created_at
-- 	)
-- VALUES (
-- 		1,
-- 		'Hi, I really like your activity!',
-- 		TRUE,
-- 		1,
-- 		CURRENT_TIMESTAMP
-- 	),
-- 	(
-- 		2,
-- 		'Thanks! Are you coming?',
-- 		TRUE,
-- 		1,
-- 		CURRENT_TIMESTAMP
-- 	),
-- 	(
-- 		1,
-- 		'Absolutely! See you then.',
-- 		TRUE,
-- 		1,
-- 		CURRENT_TIMESTAMP
-- 	)
-- returning *;
INSERT INTO messages (
		senderId,
		content,
		activity_id,
		created_at,
		senderEmail
	)
VALUES (
		3,
		'Absolutely! 3.',
		3,
		CURRENT_TIMESTAMP,
		'donkey@nintendo.com'
	),
	(
		2,
		'Absolutely! 2.',
		3,
		CURRENT_TIMESTAMP,
		'donkey@nintendo.com'
	),
	(
		1,
		'Absolutely! 1.',
		3,
		CURRENT_TIMESTAMP,
		'donkey@nintendo.com'
	),
	(
		4,
		'Absolutely! 4.',
		3,
		CURRENT_TIMESTAMP,
		'donkey@nintendo.com'
	),
	(
		5,
		'Absolutely! 5.',
		3,
		CURRENT_TIMESTAMP,
		'donkey@nintendo.com'
	)
returning *;