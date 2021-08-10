import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

export default function Login() {
	const { setUser, validateUser } = useContext(databaseContext);
	const {
		email,
		password,
		error,
		checked,
		setEmail,
		setPassword,
		setChecked,
		setError,
	} = useContext(stateContext);

	const handleChange = () => {
		//console.log("Checked before", checked.toString());
		setChecked(!checked);
		//console.log("Checked after", checked.toString());
	};

	const history = useHistory();
	const validate = (event) => {
		event.preventDefault();
		let user = validateUser(email, password, checked);
		
		if (user && !checked) {
			//console.log(" Checkdata first time from Login", checked);
			setUser(user);
			history.push("/");
		} else if (user && checked) {
			//console.log(" Checkdata second time from Login", checked);
			setUser(user);
			history.push("/promotions");
		} else {
			setError("Username or Password is incorrect!");
		}
	};

	function reset() {
		setError("");
		setEmail("");
		setPassword("");
	}

	return (
		<main>
			<header>
				<h1>Login</h1>
			</header>
			<form onSubmit={validate}>
				<div>
					<input
						name="email"
						type="email"
						id="email"
						placeholder="Username"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						value={email}
					/>
				</div>
				<div>
					<input
						name="password"
						type="password"
						id="password"
						placeholder="Password"
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						value={password}
					/>
				</div>

				<div>
					<label>
						<input type="checkbox" checked={checked} onChange={handleChange} />
						{/* <p>Is "Business user checked?" ---  {checked.toString()}</p> */}
						Business user
					</label>
				</div>

				<div>
					<input type="button" onClick={() => reset()} value="Cancel" />
					<button type="submit">Login</button>
				</div>
				<div>{error}</div>
			</form>
		</main>
	);
}
