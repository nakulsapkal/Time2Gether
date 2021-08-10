import React, { useContext } from "react";
import { stateContext } from "providers/StateProvider";

export default function PromotionDetails() {
	const { promotion } = useContext(stateContext);

	const { title, start_date, end_date, details, promo_code } = promotion[0];
	console.log("This is promotion from line 8 in ItemDetails", promotion);

	return (
		<div className="proms">
			<section>
				<h3>Promotion Title:</h3>
				<p>{title}</p>
				<p>Start Date: {start_date}</p>
				<p>End Date: {end_date}</p>
				<p>Details: {details}</p>
				<p>Promo code: {promo_code}</p>
			</section>
		</div>
	);
}
