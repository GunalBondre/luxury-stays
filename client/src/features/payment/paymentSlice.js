import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const paymentData = localStorage.getItem("payment")
	? JSON.parse(localStorage.getItem("payment"))
	: null;
const paymentSlice = createSlice({
	name: "payment",
	initialState: { orderDetail: paymentData },
	reducers: {
		paymentSuccess: (state, action) => {
			state.orderDetail = action.payload;
		},
		paymentFailed: (state) => {
			return state;
		},
		orderSuccessMessage: (state, action) => {
			state.orderDetail = action.payload;
		},
		orderFailedMessage: (state) => {
			return state;
		},
	},
});

export const {
	paymentSuccess,
	paymentFailed,
	orderSuccessMessage,
	orderFailedMessage,
} = paymentSlice.actions;

export default paymentSlice.reducer;

export const stripePay =
	(id, price, name, to, from, token) => async (dispatch) => {
		try {
			const data = {
				id,
				price,
				name,
				to,
				from,
			};
			const stripe = await stripePromise;
			let response = await axios.post(
				"/billing/create-checkout-session",
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// if (response) {
			// 	localStorage.setItem("payment", JSON.stringify(response.data));
			// 	dispatch(paymentSuccess(response.data));
			// }
			const session = response.data;
			const result = await stripe.redirectToCheckout({
				sessionId: session.id,
			});
			if (result.error) {
				toast.error("something went wrong");
			}
		} catch (error) {
			console.log("stripepay error");
			toast.error("something went wrong");
		}
	};

export const orderSuccess = (id, token, to, from) => async (dispatch) => {
	try {
		const data = {
			id,
			to,
			from,
		};
		const response = await axios.post(`/billing/orderSuccess`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("ordersuccess", token);

		if (response) {
			dispatch(orderSuccess(response.data));
			history.push("/dashboard");
		}
	} catch (error) {
		toast.error("something went wrong");
	}
};
