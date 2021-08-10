INSERT INTO categories(name)
VALUES('Physical'),
  ('Mental'),
  ('Social'),
  ('Leisure'),
  ('Occupational')
returning *;