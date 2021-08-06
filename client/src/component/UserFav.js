import React, { useContext, useState } from "react";
import axios from "axios";
import { databaseContext } from "providers/DatabaseProvider";
import { useHistory } from "react-router-dom";

export default function UserJoin(props) {
	const { user, state, activity, setActivity } = useContext(databaseContext);
	// console.log("joined_at******************", props.joined_at);
	// console.log("user_id******************", user.id);
	// console.log("activity_id******************", activity[0].id);

	const history = useHistory();
	const [values, setValues] = useState({
		joined_at: props.joined_at,
		user_id: user.id,
		activity_id: activity[0].id,
	});

	const addFav = async () => {
		const response = await axios.post("/api/users/faved", {
			body: values,
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
	};

	const cancelFaved = async () => {
		const response = await axios.put("/api/users/faved", {
			body: values,
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
	};

	const handleJoin = async (e) => {
		e.preventDefault();

		//joined before => cancel now
		if (props.joined_at) {
			try {
				await cancelFaved();
				alert("You have cancelled successfully!");
				history.push("/");
			} catch (e) {
				alert(`Failed! ${e.message}`);
			}
		}

		// join now
		if (!props.joined_at) {
			try {
				await addFav();
				alert("You have joined successfully!");
				history.push("/user/activities");
			} catch (e) {
				alert(`Failed! ${e.message}`);
			}
		}
	};

	return (
		<div className="join-button">
			<button onClick={handleJoin}>
				{values.joined_at ? "CANCEL" : "JOIN"}
			</button>
		</div>
	);
}
