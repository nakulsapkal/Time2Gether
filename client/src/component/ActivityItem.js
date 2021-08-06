import React, { useContext } from "react";
import "./ActivityItem.css";
import { getActivityById } from "../helpers/selectors";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

export default function ActivityItem(props) {
	const { state, activity, setActivity, userActivities } =
		useContext(databaseContext);
	const { activities } = state;
	//const { activity, setActivity } = useContext(stateContext);

	const { id, details, img, myActivities } = props;

	const history = useHistory();
	// console.log("key: ", id)
	// console.log("activities: ", activities)
	return (
		<>
			{myActivities && (
				<div
					className="card"
					onClick={() => {
						console.log("Details: Line 24:", id, details, myActivities);
						setActivity(getActivityById(id, userActivities));
						history.push("/activities/detail");
					}}
				>
					<p>{details}</p>
					<img className="card--img" src={img} alt="img" />
				</div>
			)}
			{!myActivities && (
				<div
					className="card"
					onClick={() => {
						console.log("Details: Line 24:", id, details, myActivities);

						setActivity(getActivityById(id, activities));
						history.push("/activities/detail");
					}}
				>
					<p>{details}</p>
					<img className="card--img" src={img} alt="img" />
				</div>
			)}
		</>
	);
}
