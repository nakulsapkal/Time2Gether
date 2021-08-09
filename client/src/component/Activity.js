import React, { useContext } from "react";
import ActivityItem from "./ActivityItem";
import { databaseContext } from "providers/DatabaseProvider";

export default function Activity() {
	const { state } = useContext(databaseContext);
	const { activities } = state;
	return (
		<div className="App">
			{/* the state has been initialized as an object so setState somehow change it to obj.
      W/t Object.entries, .map will complaint activities is not an array */}
			{Object.entries(activities).map(([key, item]) => {
				return (
					<ActivityItem
						key={item.id}
						id={item.id}
						start_date={item.start_date}
						end_date={item.end_date}
						start_time={item.start_time}
						end_time={item.end_time}
						details={item.details}
						img={item.img}
					/>
				);
			})}
		</div>
	);
}
