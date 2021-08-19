import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

function Signup() {
	const { addUser } = useContext(databaseContext);
	const {
		email,
		password,
		firstName,
		lastName,
		setEmail,
		setPassword,
		setFirstName,
		setError,
		setLastName,
	} = useContext(stateContext);

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
			const result = addUser(customData);
			if (result) {
				history.push("/");
			}
		}
	};

	return (
		<div className="container">
			<div className="text-center">
				<h1>Create a New User</h1>
			</div>

			<form onSubmit={Registration}>
				<div className="form-group">
					<input
						type="text"
						name="First name"
						onChange={(event) => setFirstName(event.target.value)}
						placeholder="First name"
					/>
				</div>

				<div className="form-group">
					<input
						type="text"
						name="Last name"
						onChange={(event) => setLastName(event.target.value)}
						placeholder="Last name"
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						name="Email"
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Email"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						name="Password"
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Password"
					/>
				</div>

				<input id="cancel-button" type="button" value="Cancel" />
				<button type="submit" className="btn btn-primary  btn-block">
					Signup
				</button>

				<div className="text-center">
					<br></br>
					<a href="/business/signup">Business Account Registration</a>
				</div>
			</form>
		</div>
	);
}

export default Signup;
