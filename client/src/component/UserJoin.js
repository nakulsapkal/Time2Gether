import React, { useContext, useState } from "react";
import axios from "axios";
import { stateContext } from "providers/StateProvider";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";

export default function UserJoin(props) {
	const { activity } = useContext(stateContext);
	const { user, state, setState } = useContext(databaseContext);
	// console.log("joined_at******************", props.joined_at);
	// console.log("user_id******************", user.id);

	const history = useHistory();
	const [values, setValues] = useState({
		joined_at: props.joined_at,
		user_id: user.id,
		activity_id: activity[0].id,
		favStatus: props.favStatus,
	});

	// console.log("!props.joined_at************** : ", !props.joined_at);

	const addJoin = async () => {
		return await axios
			.post("/api/users/joined", {
				body: { ...values, joined_at: new Date().toISOString().slice(0, 10) },
			})
			.then((result) => {
				if (result.status !== 200) {
					throw new Error(`Request failed: ${result.status}`);
				} else {
					console.log("result.data in User Join:Line 32", result.data);
					console.log("activity in User Join:Line 33", activity);

					const newUserActivity = {
						activity_id: result.data.activity_id,
						favourite: result.data.favourite,
						joined_at: result.data.joined_at,
						user_activity_id: result.data.id,
						user_id: result.data.user_id,
						address_id: activity[0].address_id,
						category: "",
						category_id: activity[0].category_id,
						city: activity[0].city,
						created_at: activity[0].created_at,
						details: activity[0].details,
						end_date: activity[0].end_date,
						end_time: activity[0].end_time,
						img: activity[0].img,
						postal_code: activity[0].postal_code,
						province: activity[0].province,
						start_date: activity[0].start_date,
						start_time: activity[0].start_time,
						street_name: activity[0].street_name,
						street_number: activity[0].street_number,
						title: activity[0].title,
					};
					//const newUserActivity = result.data;
					console.log("newUserActivity in User Join:Line 59", newUserActivity);

					const newState = state;
					newState.userActivities.push(newUserActivity);
					setState({ ...newState });
				}
			});
	};

	const changeJoined = async () => {
		console.log("Values in User Join:Line 34", values, activity);

		if (props.favStatus === 1) {
			return await axios
				.put("/api/users/joined", {
					body: { ...values, joined_at: !props.joined_at },
				})
				.then((result) => {
					console.log("result.data", result.data);
					if (result.status !== 200) {
						throw new Error(`Request failed: ${result.status}`);
					} else {
						const updatedUserActivity = result.data;
						const newState = state;
						newState.userActivities.map((activity) => {
							if (activity.id === updatedUserActivity.id)
								return { ...activity, ...updatedUserActivity };
						});
						setState({ ...newState });
					}
				});
		} else {
			return await axios
				.delete("/api/users/joined", {
					data: values,
				})
				.then((result) => {
					if (result.status !== 200) {
						throw new Error(`Request failed: ${result.status}`);
					} else {
						const deletedUserActivity = state.userActivities.filter(
							(activity) => activity.activity_id !== values.activity_id
						);
						const newState = state;
						if (deletedUserActivity) {
							newState.userActivities = [...deletedUserActivity];
							setState({ ...newState });
						}
					}
				});
		}
	};

	const handleJoin = async (e) => {
		e.preventDefault();

		//joined before => cancel now
		if (props.joined_at !== 2) {
			try {
				await changeJoined();
				alert("You have cancelled successfully!");
				history.push("/");
			} catch (e) {
				alert(`Failed! ${e.message}`);
			}
		}

		// join now
		if (props.joined_at === 2) {
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
			{activity[0].email === user.email ? (
				""
			) : (
				<button onClick={handleJoin}>
					{/* { props.joined_at ? "CANCEL" : "JOIN"} */}
					{props.joined_at === 1 ? "CANCEL" : "JOIN"}
				</button>
			)}
		</div>
	);
}
