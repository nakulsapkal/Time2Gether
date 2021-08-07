import React, { useState } from "react";
import "./PromotionCreate.css";
import axios from "axios";
import { getLoggedUserId } from "../../helpers/selectors";
import { Redirect, Link, useHistory } from "react-router-dom";

export default function PromotionCreate(props) {
	let history = useHistory();
	const loginUserId = getLoggedUserId();
  console.log("Logged bisuness user. This is from PromotionCreate.js:", loginUserId);

	const [values, setValues] = useState({
		title: "",
		start_date: "",
		end_date: "",
		details: "",
		promo_code: "",
		loginUserId: loginUserId,
	});

	const set = (data) => {
		return ({ target: { value } }) => {
			setValues((oldValues) => ({ ...oldValues, [data]: value }));
		};
	};

	const saveFormData = async () => {
		console.log("values from PromotionCreate.js. Line 35: ", values);
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
			await saveFormData();
			history.push("/promotions");
			alert("Your promotion was successfully created!");
			setValues({
				title: "",
				start_date: "",
				end_date: "",
				details: "",
				loginUserId: loginUserId,
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
					<textarea value={values.title} onChange={set("title")} />
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
					<label>Promo Code:</label>
					<textarea value={values.details} onChange={set("promo_code")} />
				</div>

				<div>
					<button type="submit">Submit</button>
					<button>Cancel</button>
				</div>
			</form>
		</div>
	);
}
