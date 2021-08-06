import React, { useContext, useState } from "react";
import axios from "axios";
import { databaseContext } from "providers/DatabaseProvider";
import { useHistory } from "react-router-dom";

export default function UserFav(props) {
	const { user, state, activity, setActivity } = useContext(databaseContext);
	// console.log("joined_at******************", props.joined_at);
	// console.log("user_id******************", user.id);
	// console.log("activity_id******************", activity[0].id);

	const history = useHistory();
	const [values, setValues] = useState({
		user_id: user.id,
		activity_id: activity[0].id,
    favStatus: props.favStatus
	});

  // console.log("props.favStatus************** : ",props.favStatus)

  //check if the fav record exist
  //if not, add
  //if exist, update
	const addFav = async () => {
		const response = await axios.post("/api/users/faved", {
			body: {...values, favStatus : true }
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
	};

   const changeFav = async () => {
		const response = await axios.put("/api/users/faved", {
			body: {...values, favStatus : !props.favStatus }
		});
    console.log(response)
		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
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
