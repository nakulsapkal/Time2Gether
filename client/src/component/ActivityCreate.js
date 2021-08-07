import React, { useState, useContext } from "react";
import "./ActivityCreate.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";

export default function ActivityCreate() {
	const { state, setState } = useContext(databaseContext);
	let history = useHistory();
	const activityObj = history.location.state;

	const [values, setValues] = useState({
		img: activityObj && (activityObj.img || ""),
		details: activityObj && (activityObj.details || ""),
		category: activityObj && (activityObj.category || ""),
		start_date: activityObj && (activityObj.start_date.slice(0, 10) || ""),
		end_date: activityObj && (activityObj.end_date.slice(0, 10) || ""),
		start_time: activityObj && (activityObj.start_time || ""),
		end_time: activityObj && (activityObj.end_time || ""),
		street_number: activityObj && (activityObj.street_number || ""),
		street_name: activityObj && (activityObj.street_name || ""),
		city: activityObj && (activityObj.city || ""),
		province: activityObj && (activityObj.province || ""),
		postal_code: activityObj && (activityObj.postal_code || ""),
	});

	//get data from users' input for each form field
	const set = (data) => {
		return ({ target: { value } }) => {
			setValues((oldValues) => ({ ...oldValues, [data]: value }));
		};
	};

	const saveFormData = async () => {
		if (activityObj !== undefined) {
			const response = await axios.put("/api/activities/edit", {
				values: values,
				activityObj: activityObj,
			});

			const newState = state;
			newState.activities = state.activities.map((activity) => {
				if (activity.id === activityObj.activity_id) {
					return { ...activity, ...values };
				}

				return activity;
			});

			setState({ ...newState });

			if (response.status !== 200) {
				throw new Error(`Request failed: ${response.status}`);
			}
		} else {
			let newActivity;
			await axios
				.post("/api/activities/create", {
					body: values,
				})
				.then((result) => {
					if (result.status !== 200) {
						throw new Error(`Request failed: ${result.status}`);
					}
					newActivity = {
						address_id: result.data.address.id,
						category: "",
						category_id: result.data.activity.category_id,
						city: result.data.address.city,
						created_at: result.data.activity.created_at,
						details: result.data.activity.details,
						end_date: result.data.activity.end_date,
						end_time: result.data.activity.end_time,
						id: result.data.activity.id,
						img: result.data.activity.img,
						postal_code: result.data.address.postal_code,
						province: result.data.address.province,
						start_date: result.data.activity.start_date,
						start_time: result.data.activity.start_time,
						street_name: result.data.address.street_name,
						street_number: result.data.address.street_number,
						title: null,
					};
					console.log("NewActivity:Line: 119", newActivity);
				})
				.catch((err) => {
					console.error("Error While Deleting Activity: ", err);
				});

			const newState = state;
			newState.activities.push(newActivity);

			setState({ ...newState });
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await saveFormData();

			history.push("/");

			if (activityObj) {
				alert("Your activity was successfully edited!");
			} else {
				alert("Your activity was successfully created!");
			}
		} catch (e) {
			alert(`Failed! ${e.message}`);
		}
	};

	return (
		<div className="create-activity">
			<form onSubmit={onSubmit} className="create-form">
				<h2>Create Activity</h2>

				{/* <div>
          <label>Name*:</label>
          <input 
            type="text" required
            value={values.name} onChange={set("name")}
          />
        </div> */}
				<div>
					<label>Category*:</label>
					<select value={values.category} onChange={set("category")} required>
						<option value="">Select Category</option>
						<option value="Outdoor sports">Outdoor sports</option>
						<option value="Baking">Baking</option>
						<option value="Indoor Sports">Indoor sports</option>
					</select>
				</div>

				<div>
					<label>Start Date*:</label>
					<input
						id="start_date"
						type="date"
						required
						value={values.start_date}
						onChange={set("start_date")}
					/>
				</div>

				<div>
					<label>Start Time*:</label>
					<input
						id="start_time"
						type="time"
						required
						value={values.start_time}
						onChange={set("start_time")}
					/>
				</div>

				<div>
					<label>End Date*:</label>
					<input
						id="end_date"
						type="date"
						required
						value={values.end_date}
						onChange={set("end_date")}
					/>
				</div>

				<div>
					<label>End Time*:</label>
					<input
						id="end_time"
						type="time"
						required
						value={values.end_time}
						onChange={set("end_time")}
					/>
				</div>

				<div>
					<label>Img Url:</label>
					<input type="text" value={values.img} onChange={set("img")} />
				</div>

				<div>
					<label>Details:</label>
					<textarea value={values.details} onChange={set("details")} />
				</div>

				<h2>Location Detail</h2>
				<div>
					<label>Street Number*:</label>
					<input
						type="number"
						required
						value={values.street_number}
						onChange={set("street_number")}
					/>
				</div>

				<div>
					<label>Street Name*:</label>
					<input
						type="text"
						required
						value={values.street_name}
						onChange={set("street_name")}
					/>
				</div>

				<div>
					<label>City*:</label>
					<input
						type="text"
						required
						value={values.city}
						onChange={set("city")}
					/>
				</div>

				<div>
					<label>Province*:</label>
					<input
						type="text"
						required
						value={values.province}
						onChange={set("province")}
					/>
				</div>

				<div>
					<label>Postal Code*:</label>
					<input
						type="text"
						required
						value={values.postal_code}
						onChange={set("postal_code")}
					/>
				</div>

				<div>
					<button type="submit">Submit</button>
					{/*Need to convert it to input tag */}
					<button>Cancel</button>
				</div>
			</form>
		</div>
	);
}
