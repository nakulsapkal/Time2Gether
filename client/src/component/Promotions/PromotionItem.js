import React, { useContext } from "react";
import "./PromotionItem.css";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";
import { getPromotionById } from "../../helpers/selectors";

export default function PromotionItem(props) {
	const { setPromotion } = useContext(stateContext);
	const { state } = useContext(databaseContext);

	const { promotions } = state;
	const { id, title, promo_code, start_date } = props;
	const history = useHistory();

	return (
		<div
			className="promcard"
			onClick={() => {
				setPromotion(getPromotionById(id, promotions));
				history.push("/promotions/details");
			}}
		>
			<h3>{title}</h3>
			<p>Start from {start_date.slice(0,10)}</p>
			<p>Click me to get the deal!</p>
		</div>
	);
}
