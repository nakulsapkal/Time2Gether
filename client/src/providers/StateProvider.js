import { createContext, useState } from "react";

export default function StateProvider(props) {
	const [state, setState] = useState({
		users: [],
		activities: [],
		businessUser: [],
		userActivities: [],
		promotions: [],
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
	const [promotion, setPromotion] = useState([]);

	const providerData = {
		user,
		setUser,
		state,
		setState,
		activity,
		setActivity,
		email,
		setEmail,
		password,
		setPassword,
		error,
		setError,
		checked,
		setChecked,
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
		promotion,
		setPromotion,
	};

	return (
		<stateContext.Provider value={providerData}>
			{props.children}
		</stateContext.Provider>
	);
}

export const stateContext = createContext();
