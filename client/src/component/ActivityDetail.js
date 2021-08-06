import React, { useContext } from "react";
import { getJoinedTime } from "../helpers/selectors";
import UserJoin from "./UserJoin";
import { databaseContext } from "providers/DatabaseProvider";
// import { stateContext } from "providers/StateProvider";

export default function ActivityDetail(props) {
	const { user, state, activity } = useContext(databaseContext);
	const { userActivities } = state;
	//const { activity, setActivity } = useContext(stateContext);
	const {
		id,
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

	let	joined_at = "";

	if(user) {
		joined_at	= getJoinedTime(user.id, id, userActivities);
	}

console.log(user)

	return (
		<div className="card">
			<section className="activity-detail">
				<h3>Activity Details</h3>
				<p>Start Date: {start_date}</p>
				<p>Start Time: {end_date}</p>
				<p>End Date: {start_time}</p>
				<p>End Time: {end_time}</p>
				<p>Details: {details}</p>
			</section>

			<section className="activity-img">
				<img className="card--img" src={img} alt="img" />
			</section>

			<section className="location-detail">
				<h3>Location Details</h3>
				<p>Street Number: {street_number}</p>
				<p>Street Name: {street_name}</p>
				<p>City: {city}</p>
				<p>Province: {province}</p>
				<p>Postal Code: {postal_code}</p>
			</section>

			<section>
				{ user ? <UserJoin joined_at={joined_at} /> : ""}
				
			</section>
		</div>
	);
}
