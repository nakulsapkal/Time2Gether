INSERT INTO user_activity(joined_at, favourite, user_id, activity_id)
VALUES(NULL, FALSE, '1', '1'),
  (NULL, FALSE, '2', '2'),
  (NULL, FALSE, '3', '3'),
  (NULL, FALSE, '4', '4'),
  (NULL, FALSE, '5', '5'),
  (NULL, FALSE, '1', '6'),
  (NULL, FALSE, '1', '7'),
  (CURRENT_TIMESTAMP, FALSE, '1', '5'),
  (CURRENT_TIMESTAMP, TRUE, '1', '4'),
  (CURRENT_TIMESTAMP, FALSE, '2', '5'),
  (CURRENT_TIMESTAMP, FALSE, '3', '5'),
  (CURRENT_TIMESTAMP, FALSE, '4', '5')
returning *;