import React, { useContext } from "react";
import "./PromotionItem.css";
import { useHistory } from "react-router-dom";
import { databaseContext } from "providers/DatabaseProvider";
import { stateContext } from "providers/StateProvider";
import { getPromotionById } from "../../helpers/selectors";

export default function PromotionItem(props) {
	const { state, promotion, setPromotion } = useContext(databaseContext);
	const { promotions } = state;
	const { id, title } = props;
 	const history = useHistory();
	
	return (
		<div
			className="promcard"
			onClick={() => {
				setPromotion(getPromotionById(id, promotions));
        history.push("/promotion/details");
			}}
		>
			<p>{title}</p>
		</div>
	);
}