import "./ActivityDetail.css";
import React, { useContext } from "react";
import {
	getJoinedTime,
	getFavStatus,
	getActivityCreatedByUser,
	getActivitiesFavouriteByUser,
} from "../helpers/selectors";
import UserJoin from "component/UserJoin";
import UserFav from "component/UserFav";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";
import Message from "./Message";

export default function ActivityDetail() {
	const { user, state } = useContext(databaseContext);
	const { activity } = useContext(stateContext);
	const { userActivities } = state;

	const {
		id,
		title,
		start_date,
		end_date,
		start_time,
		end_time,
		details,
		img,
		street_number,
		street_name,
		city,
		province,
		postal_code,
	} = activity[0];

	let joined_at, favStatus;


	if (user) {
		// createdActivities = getActivityCreatedByUser(user.id, userActivities).find(
		// 	(obj) => obj.activity_id === id
		// );
		// favouriteActivities = getActivitiesFavouriteByUser(
		// 	user.id,
		// 	userActivities
		// ).find((obj) => obj.activity_id === id);
		// console.log("CreatedACT:", createdActivities, id, user);
		joined_at = getJoinedTime(user.id, id, userActivities);
		favStatus = getFavStatus(user.id, id, userActivities);
		console.log("joined_at************** : Line 33", joined_at, user);
	}

	return (
		<div id="detail-card">
			<section className="activity-detail">
				<h2>{title}</h2>
				<h4>Activity Details</h4>
				<p>Start Time: {start_date.slice(0, 10)} {start_time}</p>
				<p>End Time: {end_date.slice(0, 10)} {end_time}</p>
				<p>Details: {details}</p>
			</section>

			<section className="activity-img">
				<img className="card--img" src={img} alt="img" />
			</section>

			<section className="location-detail">
				<h4>Location Details</h4>
				<p>{street_number} {street_name}, {city}, {province} {postal_code} </p>
			</section>

			<section>
				{user ? <UserJoin joined_at={joined_at} favStatus={favStatus} /> : ""}
				{user ? <UserFav joined_at={joined_at} favStatus={favStatus} /> : ""}
			</section>

			<section>{user ? <Message /> : ""}</section>
		</div>
	);
}
