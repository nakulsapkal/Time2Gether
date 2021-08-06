function getActivityById(id, activities) {
  return activities.filter((a) => a.id === id);
}

function getPromotionById(id, promotions) {
  //console.log("this is from selector id and promotions", id, promotions);
  let result = promotions.filter((a) => a.id === id);
  console.log("The result from selector",result);
  return promotions.filter((a) => a.id === id);
}

function getLoggedUserId() {
  const loginUser = JSON.parse(localStorage.getItem('userData'));
  const loginUserId = loginUser.id
  return loginUserId;
}

function getActivityByUser(id, activities) {
  return activities.find((actObj) => actObj.user_id === id);
}

function getActivityCreatedByUser(id, activities) {
  return activities.filter(
    (actObj) => actObj.user_id === id && actObj.joined_at === null
  );
}

function getUpcomingActivityForUser(id, activities) {
  let date = new Date().toISOString().slice(0, 10);
  return activities.filter(
    (actObj) =>
      actObj.user_id === id &&
      actObj.joined_at !== null &&
      actObj.start_date > date
  );
}

function getActivityHistoryForUser(id, activities) {
  let date = new Date().toISOString().slice(0, 10);
  return activities.filter(
    (actObj) => actObj.user_id === id && actObj.end_date < date
  );
}

function getActivitiesFavouriteByUser(id, activities) {
  return activities.filter(
    (actObj) => actObj.user_id === id && actObj.favourite === true
  );
}

function getJoinedTime(id, act_id, activities) {
  let  status, act;

  if(id && act_id) {
    act = act_id && activities.find((actObj) => actObj.user_id === id && actObj.activity_id === act_id);
  }
	console.log("act.joined_at******************", act.joined_at);

  if (act === undefined)  status = 2; //no record, need insert new
  if (act && act.joined_at) status = 1; //currently joined
  if (act && act.joined_at === false) status = 0;//record exist but cancelled once
  console.log("status******************", status);
return status
}

function getFavStatus(id, act_id, activities) {
  let status, act;

  if(id && act_id) {
    act = activities.find((actObj) => actObj.user_id === id && actObj.activity_id === act_id);
  }
    if (act === undefined)  status = 2; //no record, need insert new
    if (act && act.favourite === true) status = 1; //fav: true
    if (act && act.favourite === false) status = 0;//fav: false

  return status
}

export {
  getActivityById,
  getLoggedUserId,
  getActivityByUser,
  getUpcomingActivityForUser,
  getActivityCreatedByUser,
  getActivitiesFavouriteByUser,
  getActivityHistoryForUser,
  getJoinedTime,
  getPromotionById,
  getFavStatus
};
