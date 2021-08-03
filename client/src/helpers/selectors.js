function getActivityById(id, activities) {
  return activities.filter((a) => a.id === id);
}

function getActivityByUser(activities) {
  let user = localStorage.getItem("user");
  return activities.find((actObj) => actObj.user_id === user.id);
}
export { getActivityById, getActivityByUser };
