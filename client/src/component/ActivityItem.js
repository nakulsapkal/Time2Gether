import React, { useContext } from "react";
import "./ActivityItem.css";
import { getActivityById } from "../helpers/selectors";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

export default function ActivityItem(props) {
	const { state, activity, setActivity } = useContext(databaseContext);
	const { activities } = state;
	//const { activity, setActivity } = useContext(stateContext);

	const { id, details, img } = props;

	const history = useHistory();
	// console.log("key: ", id)
	// console.log("activities: ", activities)
	return (
		<div
			className="card"
			onClick={() => {
				setActivity(getActivityById(id, activities));
				history.push("/activities/detail");
			}}
		>
			<p>{details}</p>
			<img className="card--img" src={img} alt="img" />
		</div>
	);
}
