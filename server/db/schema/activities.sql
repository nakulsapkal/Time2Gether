DROP TABLE IF EXISTS activities CASCADE;
CREATE TABLE activities (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(255),
	created_at TIMESTAMP NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	img VARCHAR(255),
	details TEXT,
	address_id INTEGER REFERENCES address(id) ON DELETE CASCADE,
	category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);