import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const paymentData = localStorage.getItem("payment")
	? JSON.parse(localStorage.getItem("payment"))
	: null;
const BookingData = localStorage.getItem("bookingData")
	? JSON.parse(localStorage.getItem("bookingData"))
	: null;
const paymentSlice = createSlice({
	name: "payment",
	initialState: { orderDetail: paymentData, fetchBooking: {} },
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
		fetchBookingSuccess: (state, action) => {
			state.fetchBooking = action.payload;
		},
		fetchBookingFailed: (state) => {
			return state;
		},
	},
});

export const {
	paymentSuccess,
	paymentFailed,
	orderSuccessMessage,
	orderFailedMessage,
	fetchBookingSuccess,
	fetchBookingFailed,
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
			const session = response.data;
			if (session) {
				localStorage.setItem("payment", JSON.stringify(session));
				dispatch(orderSuccessMessage(session));
				const result = await stripe.redirectToCheckout({
					sessionId: session.id,
				});
				if (result.error) {
					toast.error("something went wrong");
				}
			}
		} catch (error) {
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
		console.log(response.data);
		if (response) {
			history.push("/dashboard");
		}
	} catch (error) {
		toast.error("something went wrong");
	}
};

export const userBookings = (token) => async (dispatch) => {
	try {
		let response = await axios.get(`/hotel/user-bookings`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		if (response) {
			// localStorage.setItem("bookingData", JSON.stringify(response.data));

			dispatch(fetchBookingSuccess(response.data));
		} else {
			dispatch(fetchBookingFailed());
		}
	} catch (error) {}
};
