import React, { useContext } from "react";
import { databaseContext } from "providers/DatabaseProvider";

export default function PromotionDetails(props) {
	const { state, promotion } = useContext(databaseContext);

	console.log("This is promotion from line 6 in ItemDetails", promotion);

	const { promotions } = state;
	const { id, title, start_date, end_date, details } = promotion[0];
	
	return (
		<div className="proms">
			<section>
				<h3>Promotion Title:</h3>
				<p>{title}</p>
				<p>Start Date: {start_date}</p>
				<p>End Date: {end_date}</p>
				<p>Details: {details}</p>
			</section>
		</div>
	);
}
