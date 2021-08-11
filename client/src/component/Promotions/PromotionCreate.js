import React, { useState, useContext } from "react";
import "./PromotionCreate.css";
import axios from "axios";
import { getLoggedUserId } from "../../helpers/selectors";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";

export default function PromotionCreate() {
	const { user, state, setState } = useContext(databaseContext);
	let history = useHistory();
	const loginUserId = getLoggedUserId();

	const [values, setValues] = useState({
		title: "",
		start_date: "",
		end_date: "",
		details: "",
		promo_code: "",
		user_id: user.id,
	});

	//get data from users' input for each form field
	const set = (data) => {
		return ({ target: { value } }) => {
			setValues((oldValues) => ({ ...oldValues, [data]: value }));
		};
	};

	const saveFormData = async () => {
		let newPromotion;
		console.log("values from PromotionCreate.js. Line 32: ", values);
		await axios
			.post("/api/promotions/create", {
				body: values,
			})
			.then((result) => {
				if (result.status !== 200) {
					throw new Error(`Request failed: ${result.status}`);
				}
				console.log("Result", result);
				newPromotion = {
					title: values.title,
					start_date: values.start_date,
					end_date: values.end_date,
					details: values.details,
					promo_code: values.promo_code,
					user_id: user.id,
				};
				console.log("This is new Promotion. Line 48", newPromotion);
				const newState = state;
				newState.promotions.push(newPromotion);
				setState({ ...newState });
			})
			.catch((err) => {
				console.error("Error while adding promotion: ", err);
			});
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await saveFormData();
			history.push("/promotions");
			alert("Your promotion was successfully created!");
		} catch (e) {
			alert(`Failed! ${e.message}`);
		}
	};

	function reset() {
		history.push("/promotions");
	}

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
					<label>Promo code:</label>
					<textarea value={values.promo_code} onChange={set("promo_code")} />
				</div>

				<div>
					<input id="cancel-button" type="button" onClick={() => reset()} value="Cancel" />
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}
