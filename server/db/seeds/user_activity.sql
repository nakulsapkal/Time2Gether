INSERT INTO user_activity(joined_at, user_id, activity_id)
VALUES(NULL, '1', '2'),
  (NULL, '2', '3'),
  (NULL, '3', '5'),
  (CURRENT_TIMESTAMP, '1', '5');