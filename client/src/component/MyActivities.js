import React, { useContext } from "react";
import ActivityItem from "./ActivityItem";
import { UserProfile } from "./UserProfile";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

import {
	getUpcomingActivityForUser,
	getActivityCreatedByUser,
	getActivitiesFavouriteByUser,
	getActivityHistoryForUser,
} from "helpers/selectors";

export default function MyActivities() {
	const { user, state, deleteActivity } = useContext(databaseContext);
	const { option, setOption } = useContext(stateContext);

	const { userActivities } = state;

	let createdActivities,
		upcomingActivities,
		activitiesHistory,
		favouriteActivities;
	if (user) {
		createdActivities = getActivityCreatedByUser(user.id, userActivities);
		upcomingActivities = getUpcomingActivityForUser(user.id, userActivities);
		activitiesHistory = getActivityHistoryForUser(user.id, userActivities);
		favouriteActivities = getActivitiesFavouriteByUser(user.id, userActivities);
	}

	const CREATED = "Created";
	const UPCOMING = "Upcoming";
	const FAVOURITE = "Favourite";
	const HISTORY = "History";

	const history = useHistory();

	const handleChange = (event) => {
		setOption(event.target.value);
	};

	function handleEditActivity(activityObj) {
		history.push("/activities/create", activityObj);
	}

	return (
		<div>
			<div>
				<select onChange={handleChange}>
					<option value="">Select Activity Category</option>
					<option value="Created">Created</option>
					<option value="Upcoming">Upcoming</option>
					<option value="History">History</option>
					<option value="Favourite">Favourite</option>
				</select>

				{user && <UserProfile />}
				{option === CREATED &&
					Object.entries(createdActivities).map(([key, item]) => {
						return (
							<div key={key}>
								<ActivityItem
									key={key}
									id={item.activity_id}
									start_date={item.start_date}
									end_date={item.end_date}
									start_time={item.start_time}
									end_time={item.end_time}
									details={item.details}
									img={item.img}
									myactivities={true}
								/>
								<button onClick={() => handleEditActivity(item)}>EDIT</button>
								<button onClick={() => deleteActivity(item)}>DELETE</button>
							</div>
						);
					})}
				{option === UPCOMING &&
					Object.entries(upcomingActivities).map(([key, item]) => {
						return (
							<ActivityItem
								key={key}
								id={item.activity_id}
								start_date={item.start_date}
								end_date={item.end_date}
								start_time={item.start_time}
								end_time={item.end_time}
								details={item.details}
								img={item.img}
								myactivities={true}
							/>
						);
					})}
				{option === FAVOURITE &&
					Object.entries(favouriteActivities).map(([key, item]) => {
						return (
							<ActivityItem
								key={key}
								id={item.activity_id}
								start_date={item.start_date}
								end_date={item.end_date}
								start_time={item.start_time}
								end_time={item.end_time}
								details={item.details}
								img={item.img}
								myactivities={true}
							/>
						);
					})}
				{option === HISTORY &&
					Object.entries(activitiesHistory).map(([key, item]) => {
						return (
							<ActivityItem
								key={key}
								id={item.activity_id}
								start_date={item.start_date}
								end_date={item.end_date}
								start_time={item.start_time}
								end_time={item.end_time}
								details={item.details}
								img={item.img}
								myactivities={true}
							/>
						);
					})}
			</div>
		</div>
	);
}
