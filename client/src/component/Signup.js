import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";

function Signup() {
	const {
		addUser,
		email,
		password,
		firstName,
		lastName,
		setEmail,
		setPassword,
		setFirstName,
		setError,
		setLastName,
	} = useContext(databaseContext);

	const history = useHistory();
	const Registration = (event) => {
		if (firstName === "") {
			setError("First name cannot be blank");
			alert("First name cannot be blank");
			return;
		} else if (lastName === "") {
			setError("Last name cannot be blank");
			alert("Last name cannot be blank");
			return;
		} else if (email === "") {
			setError("Email cannot be blank");
			alert("Email cannot be blank");
		} else if (password === "") {
			setError("Password cannot be blank");
			alert("Password cannot be blank");
			return;
		} else {
			setError("");
			event.preventDefault();
			const customData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			};
			//console.log("This is customData in line 12 of signup",customData)
			const result = addUser(customData);
			if (result) {
				history.push("/");
			}
		}
	};

	return (
		<div class="container">
			<div class="text-center">
				<h1>Create a New User</h1>
			</div>

			
			<form onSubmit={Registration} class="user">
				<div class="form-group">
					<input
						type="text"
						name="First name"
						onChange={(event) => setFirstName(event.target.value)}
						placeholder="First name"
					/>
				</div>

				<div class="form-group">
					<input
						type="text"
						name="Last name"
						onChange={(event) => setLastName(event.target.value)}
						placeholder="Last name"
					/>
				</div>
				<div class="form-group">
					<input
						type="email"
						name="Email"
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Email"
					/>
				</div>
				<div class="form-group">
					<input
						type="password"
						name="Password"
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Password"
					/>
				</div>
				
				<button type="submit" class="btn btn-primary  btn-block">
					Create User
				</button>

				<div class="text-center">
				<br></br>
					<a href="/business/signup">Business Account Registration</a>
				</div>
				
			</form>
		</div>
	);
}

export default Signup;
