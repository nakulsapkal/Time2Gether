import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";

function BusinessSignup() {
	const { addBusinessUser } = useContext(databaseContext);
	const {
		email,
		password,
		setEmail,
		setPassword,
		setError,
		businessName,
		setBusinessName,
		ownerName,
		setOwnerName,
		registrationNumber,
		setRegistrationNumber,
		phoneNumber,
		setPhoneNumber,
	} = useContext(stateContext);

	const history = useHistory();
	const Registration = (event) => {
		if (businessName === "") {
			setError("Company name cannot be blank");
			alert("Company name cannot be blank");
			return;
		} else if (ownerName === "") {
			setError("Owner name cannot be blank");
			alert("Owner name cannot be blank");
			return;
		} else if (email === "") {
			setError("Email cannot be blank");
			alert("Email cannot be blank");
		} else if (password === "") {
			setError("Password cannot be blank");
			alert("Password cannot be blank");
			return;
		} else if (registrationNumber === "") {
			setError("Registration number cannot be blank");
			alert("Registration number cannot be blank");
			return;
		} else if (phoneNumber === "") {
			setError("Phone number cannot be blank");
			alert("Phone number cannot be blank");
			return;
		} else {
			setError("");
			event.preventDefault();
			const businessData = {
				businessName: businessName,
				ownerName: ownerName,
				registrationNumber: registrationNumber,
				email: email,
				phoneNumber: phoneNumber,
				password: password,
			};
			const result = addBusinessUser(businessData);
			if (result) {
				history.push("/promotions");
			}
		}
	};

	return (
		<div class="container">
			<div class="text-center">
				<h1>Create a New Business User</h1>
			</div>
			<form onSubmit={Registration} class="user">
				<div class="form-group">
					<input
						type="text"
						name="Company name"
						onChange={(event) => setBusinessName(event.target.value)}
						placeholder="Company name"
					/>
				</div>
				<div class="form-group">
					<input
						type="text"
						name="Owner name"
						onChange={(event) => setOwnerName(event.target.value)}
						placeholder="Owner name"
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
						type="text"
						name="RegistrationNumber"
						onChange={(event) => setRegistrationNumber(event.target.value)}
						placeholder="Registration number"
					/>
				</div>
				<div class="form-group">
					<input
						type="text"
						name="Phone number"
						onChange={(event) => setPhoneNumber(event.target.value)}
						placeholder="Phone number"
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
					Create Business User
				</button>
			</form>
		</div>
	);
}

export default BusinessSignup;
