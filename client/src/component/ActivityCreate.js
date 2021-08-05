import React, { useState } from "react";
import "./ActivityCreate.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getLoggedUserId } from "../helpers/selectors";
import { Redirect, Link, useHistory } from "react-router-dom";

// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider,
// } from '@material-ui/pickers';

export default function ActivityCreate(props) {
	const location = useLocation();
	console.log("History State:", location);
	const activityObj = location.state;
	const loginUser = JSON.parse(localStorage.getItem("userData"));
	//const loginUserId = loginUser.id;
	let history = useHistory();
	const loginUserId = getLoggedUserId();

	const [values, setValues] = useState({
		img: "",
		details: "",
		category: "",
		start_date: "",
		end_date: "",
		start_time: "",
		end_time: "",
		street_number: "",
		street_name: "",
		city: "",
		province: "",
		postal_code: "",
		loginUserId: loginUserId,
	});

	//get data from users' input for each form field
	const set = (data) => {
		return ({ target: { value } }) => {
			setValues((oldValues) => ({ ...oldValues, [data]: value }));
		};
	};

	const saveFormData = async () => {
		console.log("values from line 30: ", values);
		const response = await axios.post("/api/activities/create", {
			body: values,
		});

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			// await saveFormData();
			// alert("Your activity was successfully created!");
			await saveFormData();
			history.push("/");
			alert("Your activity was successfully created!");
			setValues({
				img: "",
				details: "",
				category: "",
				start_date: "",
				end_date: "",
				start_time: "",
				end_time: "",
				street_number: "",
				street_name: "",
				city: "",
				province: "",
				postal_code: "",
			});
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
					<select value={values.category} onChange={set("category")}>
						<option>Select Category</option>
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
					<button>Cancel</button>
				</div>
			</form>
		</div>
	);
}
