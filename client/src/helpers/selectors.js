function getActivityById(id, activities) {
  return activities.filter((a) => a.id === id);
}

function getActivityByUser(activities) {
  let user = localStorage.getItem("user");
  return activities.find((actObj) => actObj.user_id === user.id);
}

function getActivityCreatedByUser(id, activities) {
  let user = localStorage.getItem("user");
  return activities.filter(
    (actObj) => actObj.user_id === user.id && actObj.joined_at === null
  );
}

function getActivityJoinedByUser(id, activities) {
  let user = localStorage.getItem("user");
  return activities.filter(
    (actObj) => actObj.user_id === user.id && actObj.joined_at !== null
  );
}

function getActivityHistoryForUser(id, activities) {
  let user = localStorage.getItem("user");
  let date = new Date();

  return activities.filter(
    (actObj) => actObj.user_id === user.id && actObj.end_date < date
  );
}

function getActivitiesFavouriteByUser(id, activities) {
  let user = localStorage.getItem("user");
  return activities.filter(
    (actObj) => actObj.user_id === user.id && actObj.favourite === true
  );
}

export {
  getActivityById,
  getActivityByUser,
  getActivityJoinedByUser,
  getActivityCreatedByUser,
  getActivitiesFavouriteByUser,
  getActivityHistoryForUser,
};
