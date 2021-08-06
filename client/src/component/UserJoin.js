import React, { useContext, useState } from "react";
import axios from "axios";
import { databaseContext } from "providers/DatabaseProvider";
import { useHistory } from "react-router-dom";

export default function UserJoin(props) {
	const { user, state, activity } = useContext(databaseContext);
	console.log("joined_at******************", props.joined_at);
	console.log("user_id******************", user.id);
	// console.log("activity_id******************", activity[0].joined_at);

	const history = useHistory();
	const [values, setValues] = useState({
		joined_at: props.joined_at,
		user_id: user.id,
		activity_id: activity[0].id,
	});

    console.log("!props.joined_at************** : ",!props.joined_at)

	const addJoin = async () => {
		const response = await axios.post("/api/users/joined", {
			body: {...values, joined_at : new Date().toISOString().slice(0, 10) }
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
	};

	const changeJoined = async () => {
		const response = await axios.put("/api/users/joined", {
			body: {...values, joined_at : !props.joined_at }
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
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
        { activity[0].email === user.email ? "" :
        <button onClick={handleJoin}>
          {/* { props.joined_at ? "CANCEL" : "JOIN"} */}
          { props.joined_at === 1 ? "CANCEL" : "JOIN"}

        </button>
        }
      </div> 
	);
}
