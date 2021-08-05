import { createContext, useState } from "react";

export default function StateProvider(props) {
	// Here is our Shared State Object
	const [activity, setActivity] = useState([]);

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
