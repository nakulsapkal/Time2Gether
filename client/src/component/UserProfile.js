import React, { useContext } from "react";
import "./UserProfile.css";
import { databaseContext } from "providers/DatabaseProvider";

export function UserProfile() {
	const { user } = useContext(databaseContext);
	const { first_name, last_name, avatar } = user;
	return (
		<div className="card">
			<img className="card--img" src={avatar} alt="img" />
			<h2>
				{first_name}
				{last_name}
			</h2>
		</div>
	);
}
