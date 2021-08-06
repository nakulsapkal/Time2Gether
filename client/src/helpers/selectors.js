function getActivityById(id, activities) {
	return activities.filter((a) => a.id === id);
}

function getLoggedUserId() {
	const loginUser = JSON.parse(localStorage.getItem("userData"));
	const loginUserId = loginUser.id;
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
	const act =
		act_id &&
		activities.find(
			(actObj) => actObj.user_id === id && actObj.activity_id === act_id
		);
	return act ? act.joined_at : null;
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
};
