import React, { useContext, useState } from "react";
import axios from "axios";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";
import { useHistory } from "react-router-dom";

export default function UserFav(props) {
	const { user, state, setState } = useContext(databaseContext);
	const { activity } = useContext(stateContext);
	// console.log("joined_at******************", props.joined_at);
	// console.log("user_id******************", user.id);
	// console.log("activity_id******************", activity[0].id);

	const history = useHistory();
	const [values, setValues] = useState({
		user_id: user.id,
		activity_id: activity[0].id,
		favStatus: props.favStatus,
		joined_at: props.joined_at,
	});

	// console.log("props.favStatus************** : ",props.favStatus)

	//check if the fav record exist
	//if not, add
	//if exist, update
	const addFav = async () => {
		return await axios
			.post("/api/users/faved", {
				body: { ...values, favStatus: true },
			})
			.then((result) => {
				if (result.status !== 200) {
					throw new Error(`Request failed: ${result.status}`);
				} else {
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
						title: null,
					};

					const newState = state;
					newState.userActivities.push(newUserActivity);
					setState({ ...newState });
				}
			});
	};

	const changeFav = async () => {
		if (props.joined_at === 1) {
			return await axios
				.put("/api/users/faved", {
					body: { ...values, favStatus: !props.favStatus },
				})
				.then((result) => {
					if (result.status !== 200) {
						throw new Error(`Request failed: ${result.status}`);
					} else {
						const updatedUserActivity = result.data;
						const newState = state;
						newState.userActivities.map((activity) => {
							if (activity.id === updatedUserActivity.id) {
								return { ...activity, ...updatedUserActivity };
							}
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

		// console.log(response);
		// if (response.status !== 200) {
		// 	throw new Error(`Request failed: ${response.status}`);
		// }
	};

	const handleFav = async (e) => {
		e.preventDefault();

		if (props.favStatus !== 2) {
			try {
				await changeFav();
				alert("You have cancelled successfully!");
				history.push("/");
			} catch (e) {
				alert(`Failed! ${e.message}`);
			}
		}

		if (props.favStatus === 2) {
			try {
				await addFav();
				alert("You have favourited it successfully!");
				history.push("/user/activities");
			} catch (e) {
				alert(`Failed! ${e.message}`);
			}
		}
	};
	// console.log(props.favStatus)
	// console.log("activity_id******************", values.activity_id);
	return (
		<div className="fav-button">
			<button onClick={handleFav}>
				{props.favStatus === 1 ? "Unfavouraite" : "Favourite"}
			</button>
		</div>
	);
}
