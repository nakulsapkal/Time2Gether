import React, { useContext } from "react";
import { databaseContext } from "providers/DatabaseProvider";

export default function PromotionDetails() {
	const { state, promotion } = useContext(databaseContext);
 
  console.log("promotion from promo-details", promotion);

	const { title, start_date, end_date, details } = promotion[0];
    
	return (
		<div className="card">
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
