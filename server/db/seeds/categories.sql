INSERT INTO categories(name)
VALUES('Outdoor'),
  ('Indoor'),
  ('Baking'),
  ('Cooking')
returning *;