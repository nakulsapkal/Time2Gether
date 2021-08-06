import { createContext, useState } from "react";

export default function StateProvider(props) {
	// Here is our Shared State Object
	//const [allStates, setAllStates]	= useState(
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
	//)

	// This list can get long with a lot of functions.  Reducer may be a better choice
	const providerData = {
		activity,
		setActivity,
	};

	// We can now use this as a component to wrap anything
	// that needs our state
	return (
		<stateContext.Provider value={providerData}>
			{props.children}
		</stateContext.Provider>
	);
}

export const stateContext = createContext();
