DROP TABLE IF EXISTS address CASCADE;
CREATE TABLE address (
	id SERIAL PRIMARY KEY NOT NULL,
	street_number VARCHAR(255) NOT NULL,
	street_name VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	province VARCHAR(255) NOT NULL,
	postal_code VARCHAR(255) NOT NULL
);