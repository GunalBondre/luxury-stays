import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";

//
const hotelSlice = createSlice({
	name: "hotel",
	initialState: {
		hotel: {
			hotelName: "",
			description: "",
			location: "",
			price: "",
			bed: "",
			to: "",
			from: "",
			image: "",
		},
	},

	// reducers
	reducers: {
		registerSuccess: (state, action) => {
			state.hotel = action.payload;
		},
		registerFailure: (state, action) => {
			return state;
		},
	},
});

const { registerFailure, registerSuccess } = hotelSlice.actions;

export default hotelSlice.reducer;

export const register = (data, token) => async (dispatch) => {
	let hotelData = new FormData();

	hotelData.append("hotelName", data.hotelName);
	hotelData.append("description", data.description);
	hotelData.append("price", data.price);
	hotelData.append("to", data.to);
	hotelData.append("from", data.from);
	hotelData.append("location", data.location);
	data.image && hotelData.append("image", data.image);
	hotelData.append("bed", data.bed);

	const res = await axios.post("/hotel/register", hotelData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (res) {
		dispatch(registerSuccess(res.data));
		console.log(res.data);
		history.push("/");
	} else {
		dispatch(registerFailure());
		console.log("error");
	}
};
