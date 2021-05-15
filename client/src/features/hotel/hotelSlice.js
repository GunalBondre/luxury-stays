import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";

//
const hotelSlice = createSlice({
	name: "hotel",
	initialState: {
		hotel: {},
	},

	// reducers
	reducers: {
		registerSuccess: (state, action) => {
			state.hotel = action.payload;
		},
		registerFailure: (state, action) => {
			return state;
		},
		getAllHotelSuccess: (state, action) => {
			state.hotel = action.payload;
		},
		getAllHotelFailure: (state, action) => {
			return state;
		},
	},
});

const {
	registerFailure,
	registerSuccess,
	getAllHotelFailure,
	getAllHotelSuccess,
} = hotelSlice.actions;

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
		history.push("/");
	} else {
		dispatch(registerFailure());
		console.log("error");
	}
};

export const getAllHotel = () => async (dispatch) => {
	try {
		let res = await axios.get("/hotel");
		if (res) {
			console.log(res.data);
			dispatch(getAllHotelSuccess(res.data));
		}
	} catch (error) {
		console.log("error");
		dispatch(getAllHotelFailure());
		if (error.response.status === 400) toast.error(error.response.data);
	}
};
