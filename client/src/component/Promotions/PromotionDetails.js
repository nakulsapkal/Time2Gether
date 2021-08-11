import React, { useContext } from "react";
import { stateContext } from "providers/StateProvider";

export default function PromotionDetails() {
	const { promotion } = useContext(stateContext);

	const { title, start_date, end_date, details, promo_code } = promotion[0];

	return (
		<div className="promo-card">
			<section className="promo-detail">
				<h3>{title}</h3>
			
				<p>Start Date: {start_date.slice(0, 10)}</p>
				<p>End Date: {end_date.slice(0, 10)}</p>
				<p>Details: {details}</p>
				<p>Promo code: {promo_code}</p>
			</section>
		</div>
	);
}
