function getActivityById(id, activities) {
  return activities.filter((a) => a.id === id);
}

function isLogin() {
  const loginUser = JSON.parse(localStorage.getItem('User'))
  return loginUser? true : false;
}

export { getActivityById, isLogin };
