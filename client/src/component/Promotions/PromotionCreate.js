import React, { useState } from "react";
import "./PromotionCreate.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getLoggedUserId } from "../../helpers/selectors";
import { Redirect, Link, useHistory } from "react-router-dom";

export default function PromotionCreate(props) {
	const location = useLocation();
	console.log("History State:", location);
	const promotionsObj = location.state;
	const loginUser = JSON.parse(localStorage.getItem("userData"));
	//const loginUserId = loginUser.id;
	let history = useHistory();
	const loginUserId = getLoggedUserId();
  console.log("Logged bisuness user+++++++++:", loginUserId);

	const [values, setValues] = useState({
		title: "",
		start_date: "",
		end_date: "",
		start_time: "",
		detailes: "",
		province: "",
		loginUserId: loginUserId,
	});

	const set = (data) => {
		return ({ target: { value } }) => {
			setValues((oldValues) => ({ ...oldValues, [data]: value }));
		};
	};

	const saveFormData = async () => {
		console.log("values from line 35: ", values);
		const response = await axios.post("/api/promotions/create", {
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
			history.push("/promotions");
			alert("Your promotion was successfully created!");
			setValues({
				ititle: "",
        start_date: "",
        end_date: "",
        start_time: "",
        detailes: "",
        province: "",
			});
		} catch (e) {
			alert(`Failed! ${e.message}`);
		}
	};

	return (
		<div className="create-promotion">
			<form onSubmit={onSubmit} className="promcreate-form">
				<h2>Create Promotion</h2>

				<div>
					<label>Title:</label>
					<textarea value={values.details} onChange={set("title")} />
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
					<label>Details:</label>
					<textarea value={values.details} onChange={set("details")} />
				</div>

				<div>
					<button type="submit">Submit</button>
					<button>Cancel</button>
				</div>
			</form>
		</div>
	);
}
