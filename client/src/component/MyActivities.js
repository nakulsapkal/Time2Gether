import React, { useContext } from "react";
import ActivityItem from "./ActivityItem";
import { UserProfile } from "./UserProfile";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import {
	getUpcomingActivityForUser,
	getActivityCreatedByUser,
	getActivitiesFavouriteByUser,
	getActivityHistoryForUser,
} from "helpers/selectors";
export default function MyActivities() {
	const { user, state, deleteActivity, option, setOption } =
		useContext(databaseContext);

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
					<option>Select Activity Category</option>
					<option value="Created">Created</option>
					<option value="Upcoming">Upcoming</option>
					<option value="History">History</option>
					<option value="Favourite">Favourite</option>
				</select>

				{user && <UserProfile />}
				{option === CREATED &&
					Object.entries(createdActivities).map(([key, item]) => {
						return (
							<div>
								<ActivityItem
									key={item.id}
									id={item.id}
									start_date={item.start_date}
									end_date={item.end_date}
									start_time={item.start_time}
									end_time={item.end_time}
									details={item.details}
									img={item.img}
									activities={createdActivities}
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
								key={item.id}
								id={item.id}
								start_date={item.start_date}
								end_date={item.end_date}
								start_time={item.start_time}
								end_time={item.end_time}
								details={item.details}
								img={item.img}
								activities={upcomingActivities}
							/>
						);
					})}
				{option === FAVOURITE &&
					Object.entries(favouriteActivities).map(([key, item]) => {
						return (
							<ActivityItem
								key={item.id}
								id={item.id}
								start_date={item.start_date}
								end_date={item.end_date}
								start_time={item.start_time}
								end_time={item.end_time}
								details={item.details}
								img={item.img}
								activities={favouriteActivities}
							/>
						);
					})}
				{option === HISTORY &&
					Object.entries(activitiesHistory).map(([key, item]) => {
						return (
							<ActivityItem
								key={item.id}
								id={item.id}
								start_date={item.start_date}
								end_date={item.end_date}
								start_time={item.start_time}
								end_time={item.end_time}
								details={item.details}
								img={item.img}
								activities={activitiesHistory}
							/>
						);
					})}
			</div>
		</div>
	);
}
