function getActivityById(id, activities){
  return activities.filter( a => a.id === id);
}



export { getActivityById };