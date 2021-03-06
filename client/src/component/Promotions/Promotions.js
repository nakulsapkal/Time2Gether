import React, { useContext } from "react";
import PromotionItem from "../Promotions/PromotionItem";
import { databaseContext } from "providers/DatabaseProvider";

export default function Promotions() {
	const { state } = useContext(databaseContext);
	const { promotions } = state;

	return (
		<div className="activities">
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
