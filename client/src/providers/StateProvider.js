import { createContext, useState } from "react";

export default function StateProvider(props) {
	const [state, setState] = useState({
		users: [],
		activities: [],
		businessUser: [],
		userActivities: [],
	});

	const [user, setUser] = useState([]);
	const [activity, setActivity] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [checked, setChecked] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [option, setOption] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [ownerName, setOwnerName] = useState("");
	const [registrationNumber, setRegistrationNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const providerData = {
		user,
		state,
		setState,
		setUser,
		activity,
		setActivity,
		email,
		password,
		error,
		checked,
		setEmail,
		setPassword,
		setChecked,
		setError,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		option,
		setOption,
		businessName,
		setBusinessName,
		ownerName,
		setOwnerName,
		registrationNumber,
		setRegistrationNumber,
		phoneNumber,
		setPhoneNumber,
	};

	return (
		<stateContext.Provider value={providerData}>
			{props.children}
		</stateContext.Provider>
	);
}

export const stateContext = createContext();
