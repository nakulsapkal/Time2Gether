import React, { useContext } from "react";
import "./ActivityItem.css";
import { getActivityById } from "../helpers/selectors";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

export default function ActivityItem(props) {
	const { state } = useContext(databaseContext);
	const { setActivity } = useContext(stateContext);
	const { activities, userActivities } = state;
	const { id, img, myActivities, title } = props;
	const history = useHistory();

	return (
		<div className="activtiy-card">
			{myActivities && (
				<div
					className="card"
					onClick={() => {
						setActivity(getActivityById(id, userActivities));
						history.push("/activities/detail");
					}}
				>
					<p>{title}</p>
					<img className="card--img" src={img} alt="img" />
				</div>
			)}
			{!myActivities && (
				<div
					className="card"
					onClick={() => {
						setActivity(getActivityById(id, activities));
						history.push("/activities/detail");
					}}
				>
					<p>{title}</p>
					<img className="card--img" src={img} alt="img" />
				</div>
			)}
		</div>
	);
}
