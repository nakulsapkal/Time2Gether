import React, { useContext } from "react";
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
			className="card"
			onClick={() => {
				setPromotion(getPromotionById(id, promotions));
        console.log("id from setPromotion where we call getPromotion by id", id);
        history.push("/promotion/details");
			}}
		>
			<p>{title}</p>
		</div>
	);
}
