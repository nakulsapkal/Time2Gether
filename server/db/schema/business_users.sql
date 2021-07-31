DROP TABLE IF EXISTS business_users CASCADE;
CREATE TABLE business_users (
	id SERIAL PRIMARY KEY NOT NULL,
	business_name VARCHAR(255) NOT NULL,
	owner_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255),
	registration_number VARCHAR(255) NOT NULL,
	phone_number VARCHAR(255) NOT NULL
);