import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderSuccess } from "../features/payment/paymentSlice";

export default function Success({ match }) {
	const { auth } = useSelector((state) => ({ ...state }));
	const { payment } = useSelector((state) => ({ ...state }));
	const { orderDetail } = payment;
	const dispatch = useDispatch();
	useEffect(() => {
		if (auth.user && auth.user.token) {
			dispatch(
				orderSuccess(
					match.params.id,
					auth.user.token,
					orderDetail.to,
					orderDetail.from
				)
			);
		}
	}, [match.params.id]);

	return (
		<div>
			<h3 className="title3 text-center">
				Payment Successful {match.params.id}{" "}
			</h3>
		</div>
	);
}
