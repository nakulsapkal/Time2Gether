INSERT INTO users(first_name, last_name, email, password, avatar)
VALUES (
		'Mario',
		'Bros',
		'mario@nintendo.com',
		'test',
		'https://i.pinimg.com/originals/dd/a4/28/dda4284972f5a75620d13d3722eb6cea.jpg'
	),
	(
		'Luigi',
		'Bros',
		'luigi@nintendo.com',
		'test',
		'https://i.pinimg.com/originals/dd/a4/28/dda4284972f5a75620d13d3722eb6cea.jpg'
	),
	(
		'Princess',
		'Peach',
		'peach@nintendo.com',
		'test',
		'https://i.pinimg.com/originals/dd/a4/28/dda4284972f5a75620d13d3722eb6cea.jpg'
	),
	(
		'Princess',
		'Daisy',
		'daisy@nintendo.com',
		'test',
		'https://i.pinimg.com/originals/dd/a4/28/dda4284972f5a75620d13d3722eb6cea.jpg'
	),
	(
		'Donkey',
		'Kong',
		'donkey@nintendo.com',
		'test',
		'https://i.pinimg.com/originals/dd/a4/28/dda4284972f5a75620d13d3722eb6cea.jpg'
	)  returning *;