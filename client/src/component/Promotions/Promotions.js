import React, { useContext } from "react";
import PromotionItem from "../Promotions/PromotionItem";
import { databaseContext } from "providers/DatabaseProvider";

export default function Promotions() {
	const { state } = useContext(databaseContext);
	console.log("State from promotions:", state);
	const { promotions } = state;
	console.log("Promotions from promotions:", promotions);

	return (
		<div className="App">
			{Object.entries(promotions).map(([key, item]) => {
				return (
					<PromotionItem
						key={item.id}
						id={item.id}
						title={item.title}
						start_date={item.start_date}
						start_time={item.start_time}
						details={item.details}
						promo_code={item.promo_code}
					/>
				);
			})}
		</div>
	);
}
