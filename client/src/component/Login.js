import React, { useContext } from "react";
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
		setChecked(!checked);
	};

	const history = useHistory();
	const validate = (event) => {
		event.preventDefault();
		let user = validateUser(email, password, checked);

		if (user && !checked) {
			setUser(user);
			history.push("/");
			reset();
		} else if (user && checked) {
			setUser(user);
			history.push("/promotions");
			reset();
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
		<main className="text-center">
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

				<div style={{ padding: "10px 0" }}>
					<label style={{ marginRight: "40px" }}>Business user</label>
					<input type="checkbox" checked={checked} onChange={handleChange} />
				</div>

				<div>
					<input
						id="cancel-button"
						type="button"
						onClick={() => reset()}
						value="Cancel"
					/>
					<button type="submit">Login</button>
				</div>
				<div>{error}</div>
			</form>
		</main>
	);
}
