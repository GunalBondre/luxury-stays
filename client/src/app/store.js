import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import hotelReducer from "../features/hotel/hotelSlice";
import paymentReducer from "../features/payment/paymentSlice";
export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		hotelDetail: hotelReducer,
		payment: paymentReducer,
	},
});
