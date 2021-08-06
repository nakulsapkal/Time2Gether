import React, { useContext, useState } from "react";
import axios from "axios";
import { stateContext } from "providers/StateProvider";
import { useHistory } from "react-router-dom";

export default function UserJoin(props) {
	const { user, activity } = useContext(stateContext);
	// console.log("joined_at******************", props.joined_at);
	// console.log("user_id******************", user.id);
	// console.log("activity_id******************", activity[0].id);

	const history = useHistory();
	const [values, setValues] = useState({
		joined_at: props.joined_at,
		user_id: user.id,
		activity_id: activity[0].id,
	});

	const addJoin = async () => {
		const response = await axios.post("/api/users/joined", {
			body: values,
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
	};

	const cancelJoined = async () => {
		const response = await axios.put("/api/users/joined", {
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
				await cancelJoined();
				alert("You have cancelled successfully!");
				history.push("/");
			} catch (e) {
				alert(`Failed! ${e.message}`);
			}
		}

		// join now
		if (!props.joined_at) {
			try {
				await addJoin();
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
