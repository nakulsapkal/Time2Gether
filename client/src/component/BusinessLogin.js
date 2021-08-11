import React, { useContext } from "react";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";
import { useHistory } from "react-router-dom";

export default function BusinessLogin() {
	const { setUser, validateBusinessUser } = useContext(databaseContext);
	const {
		error,
		password,
		setPassword,
		setError,
		registrationNumber,
		setRegistrationNumber,
	} = useContext(stateContext);

	const history = useHistory();
	const validate = (event) => {
		event.preventDefault();
		let businessUser = validateBusinessUser(registrationNumber, password);
		if (businessUser) {
			console.log("This is a business user", businessUser);
			setUser(businessUser);
			history.push("/promotions");
		} else {
			setError("Password or Registration number is incorrect!");
		}
	};

	function reset() {
		setError("");
		setRegistrationNumber("");
		setPassword("");
	}

	return (
		<main className="text-center">
			<header>
				<h1>Busines Login</h1>
			</header>
			<form onSubmit={validate}>
				<div>
					<input
						name="registrationNumber"
						type="text"
						placeholder="Business Registration Number"
						onChange={(event) => {
							setRegistrationNumber(event.target.value);
						}}
						value={registrationNumber}
					/>
				</div>
				<div>
					<input
						name="password"
						type="password"
						placeholder="Password"
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						value={password}
					/>
				</div>
				<div>
					<input id="cancel-button" type="button" onClick={() => reset()} value="Cancel" />
					<button type="submit">Login</button>
				</div>
				<div>{error}</div>
			</form>
		</main>
	);
}
