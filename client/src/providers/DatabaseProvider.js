import { createContext, useContext, useEffect } from "react";
import { stateContext } from "./StateProvider";
import axios from "axios";

export default function DatabaseProvider(props) {
	const { user, state, setState, setUser, promotions } =
		useContext(stateContext);

	//This useEffect is ran only once at the initial app start to fetch the data (async) from API via axios
	useEffect(() => {
		const p1 = axios.get("/api/users");
		const p2 = axios.get("/api/activities");
		const p3 = axios.get("/api/business/users");
		const p4 = axios.get("/api/userActivities");
		const p5 = axios.get("/api/promotions");

		Promise.all([p1, p2, p3, p4, p5]).then((all) => {
			const [first, second, third, fourth, fifth] = all;

			//For purpose of immutability copying the prev state first
			setState((prev) => ({
				...prev,
				users: first.data.users,
				activities: second.data.activities,
				businessUsers: third.data.businessUsers,
				userActivities: fourth.data.userActivities,
				promotions: fifth.data.promotions,
			}));
		});

		//setup localstorage for logged-in user
		setUser(JSON.parse(localStorage.getItem("userData")));
	}, []);

	// Validate email and password befor loginig in for usual user
	function validateUser(userEmail, userPassword, checked) {
		if (!checked) {
			let userData = state.users.find(
				(obj) => obj.email === userEmail && obj.password === userPassword
			);
			if (userData) {
				localStorage.setItem("userData", JSON.stringify(userData));
				return userData;
			} else {
				return false;
			}
		} else {
			let userData = state.businessUsers.find(
				(obj) => obj.email === userEmail && obj.password === userPassword
			);
			if (userData) {
				localStorage.setItem("userData", JSON.stringify(userData));
				return userData;
			} else {
				return false;
			}
		}
	}

	// Validate email before adding a new user
	function validateEmail(userEmail) {
		let userData;
		for (let obj in state.users) {
			userData = state.users[obj];
			if (userData.email === userEmail) {
				return true;
			}
		}
		return false;
	}

	// Validate Registration number before adding a new business user
	function validateRegNum(regNum) {
		let userData;
		for (let obj in state.businessUsers) {
			userData = state.businessUsers[obj];
			if (userData.registration_number === regNum) {
				return true;
			}
		}
		return false;
	}

	// Add a new user to the database
	function addUser(user) {
		let newUser;
		const apiUrl = "/api/users/signup";
		const email = user.email;
		if (validateEmail(email) === true) {
			alert("email is already in use");
		} else {
			axios
				.post(apiUrl, user, { headers: { "Content-Type": "application/json" } })
				.then((res) => {
					newUser = res.data;
					const newState = state;
					newState.users.push(newUser);

					setState({ ...newState });
					alert("New user is successfully added!");
					localStorage.setItem("userData", JSON.stringify(newUser));
					setUser(newUser);
				})
				.catch((error) =>
					console.log("New user not added successfully", error)
				);
		}
		return newUser;
	}

	// Add a new business user to the database
	function addBusinessUser(businessUser) {
		let newBusinessUser;

		const apiUrl = "/api/business/signup";
		const regNum = businessUser.registrationNumber;
		if (validateRegNum(regNum) === true) {
			alert("Registration number is already in use");
		} else {
			return axios
				.post(apiUrl, businessUser, {
					headers: { "Content-Type": "application/json" },
				})
				.then((res) => {
					newBusinessUser = res.data;
					const newState = state;
					newState.businessUser.push(newBusinessUser);

					setState({ ...newState });
					alert("New business user is successfully added!");
					localStorage.setItem("userData", JSON.stringify(newBusinessUser));
					setUser(newBusinessUser);
				})
				.catch((error) =>
					console.log("New business user not added successfully", error)
				);
		}
		return newBusinessUser;
	}

	//Delete an activity for a user
	function deleteActivity(activityObj) {
		const userActivities = state.userActivities.filter(
			(activity) => activity.activity_id !== activityObj.activity_id
		);

		const url = `/api/user/activity/${activityObj.activity_id}`;

		return axios
			.delete(url, {
				headers: { "Content-Type": "application/json" },
			})
			.then((result) => {
				if (result.status === "error") {
					if (result.status !== 200) {
						throw new Error(`Request failed: ${result.status}`);
					}
				} else {
					const newState = state;
					newState.userActivities = [...userActivities];
					setState({ ...newState });
					alert("Successfully Deleted Activity!");
				}
			})
			.catch((err) => {
				console.error("Error While Deleting Activity: ", err);
			});
	}

	const providerData = {
		user,
		state,
		setState,
		setUser,
		addUser,
		validateUser,
		addBusinessUser,
		deleteActivity,
		promotions,
	};

	// that needs our state
	return (
		<databaseContext.Provider value={providerData}>
			{props.children}
		</databaseContext.Provider>
	);
}

export const databaseContext = createContext();
