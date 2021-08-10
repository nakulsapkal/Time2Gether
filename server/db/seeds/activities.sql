INSERT INTO activities(
    title,
    created_at,
    start_date,
    end_date,
    start_time,
    end_time,
    img,
    details,
    address_id,
    category_id
  )
VALUES (
    'Summer Outdoor Activities',
    CURRENT_TIMESTAMP,
    '08/15/2021',
    '08/15/2021',
    '09:00:00',
    '14:00:00',
    'http://www.density-calcium.com/_Uploads/dbsArticles/Sport(2).jpg',
    'The summer holidays are a time of the year that most families look forward to with excitement, the time to relax, recuperate and switch off. However, that downtime period can also lead to an increase in inactivity.',
    '1',
    '1'
  ),
  (
    'Ball Game',
    CURRENT_TIMESTAMP,
    '09/01/2021',
    '09/01/2021',
    '11:30:00',
    '15:30:00',
    'https://antoinesoto.com/photolux/wp-content/uploads/2012/07/balls.jpg',
    'Let us play with balls! Waiting for us!',
    '2',
    '1'
  ),
  (
    'Baking Cakes',
    CURRENT_TIMESTAMP,
    '10/01/2021',
    '10/02/2021',
    '11:30:00',
    '15:30:00',
    'https://thumbs.dreamstime.com/b/assortment-different-cakes-assortment-different-cakes-chocolate-berry-fruit-cream-present-pink-cake-box-copy-109360125.jpg',
    'Cakes! Cakes! Cakes! Bake them and eat them all!',
    '3',
    '2'
  ),
  (
    'Indoor Activity',
    CURRENT_TIMESTAMP,
    '10/15/2021',
    '10/15/2021',
    '09:00:00',
    '21:00:00',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pushsquare.com%2Fscreenshots%2F54667%2Flarge.jpg&f=1&nofb=1',
    'Indoor Sports World! We are open the whole day! Come to try!',
    '4',
    '3'
  ),
  (
    'Cooking Time',
    CURRENT_TIMESTAMP,
    '11/01/2021',
    '11/01/2021',
    '10:30:00',
    '16:30:00',
    'https://thumbs.dreamstime.com/b/different-delicious-dairy-products-table-closeup-160387473.jpg',
    'Different delicious dairy products on table! We learn, we cook, we know! Come and join us!',
    '5',
    '3'
  ),
  (
    'Screening Soccer Match',
    CURRENT_TIMESTAMP,
    '12/01/2021',
    '12/01/2021',
    '12:30:00',
    '19:30:00',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILJ78Zs94B-t82yJ0W5UWBEQs4V-joOXkHw&usqp=CAU',
    'Screening Soccer Match',
    '5',
    '2'
  )
returning *;