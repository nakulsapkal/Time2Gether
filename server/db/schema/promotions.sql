DROP TABLE IF EXISTS promotions CASCADE;
CREATE TABLE promotions (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(50),
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	details TEXT,
	promo_code VARCHAR(255),
	business_id INTEGER REFERENCES business_users(id) ON DELETE CASCADE
);