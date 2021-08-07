import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";

const singleHotelData = localStorage.getItem("singleHotel")
	? JSON.parse(localStorage.getItem("singleHotel"))
	: null;

// const sellerHotelData = localStorage.getItem("sellerHotel")
// 	? JSON.parse(localStorage.getItem("sellerHotel"))
// 	: null;

const hotelSlice = createSlice({
	name: "hotel",
	initialState: {
		hotel: {},
		singleHotel: singleHotelData,
		isBooked: {},
		userBooking: {},
		searchResult: {},
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
		getSingleHotelSuccess: (state, action) => {
			state.singleHotel = action.payload;
		},
		getSingleHotelFailure: (state, action) => {
			return state;
		},

		editHotelSuccess: (state, action) => {
			state.hotel = action.payload;
		},
		deleteHotelSuccess: (state, action) => {
			return state;
		},
		bookedStatus: (state, action) => {
			state.isBooked = action.payload;
		},
		roomAvailable: (state, action) => {
			state.hotel.bed = action.payload;
		},
		userBookingsuccess: (state, action) => {
			state.userBooking = action.payload;
		},
		searchResultSuccess: (state, action) => {
			state.searchResult = action.payload;
		},
	},
});

export const {
	registerFailure,
	registerSuccess,
	getAllHotelFailure,
	getAllHotelSuccess,
	getSingleHotelFailure,
	getSingleHotelSuccess,
	editHotelSuccess,
	bookedStatus,
	deleteHotelSuccess,
	userBookingsuccess,
	searchResultSuccess,
} = hotelSlice.actions;

export default hotelSlice.reducer;

export const register = (data, token) => async (dispatch) => {
	let hotelData = new FormData();

	hotelData.append("hotelName", data.hotelName);
	hotelData.append("description", data.description);
	hotelData.append("price", data.price);
	// hotelData.append("to", data.to);
	// hotelData.append("from", data.from);
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
		history.push("/dashboard");
	} else {
		dispatch(registerFailure());
		console.log("error");
	}
};

export const getAllHotel = (roles) => async (dispatch) => {
	try {
		let res = await axios.get("/hotel");
		console.log(res);
		if (res) {
			dispatch(getAllHotelSuccess(res.data));
			if (roles === "admin" || roles === "seller") {
				history.push("/dashboard");
			}
		}
	} catch (error) {
		console.log("error");
		dispatch(getAllHotelFailure());
		if (error) toast.error("something went wrong");
	}
};

export const allHotelsAdmin = (token, roles) => async (dispatch) => {
	try {
		let res = await axios.get("/hotel/allHotelsAdmin", {
			// headers: {
			// 	Authorization: `Bearer ${token}`,
			// },
		});
		if (res) {
			dispatch(getAllHotelSuccess(res.data));
			if (roles === "admin" || roles === "seller") {
				history.push("/dashboard");
			}
		}
	} catch (error) {
		console.log("error");
		dispatch(getAllHotelFailure());
		if (error.response.status === 400 || error.response.status === 401)
			toast.error("something went wrong");
	}
};

export const getSingleHotel = (id, token) => async (dispatch) => {
	try {
		let response = await axios.get(`/hotel/${id}`);
		if (response.data) {
			localStorage.setItem("singleHotel", JSON.stringify(response.data));
			dispatch(getSingleHotelSuccess(response.data));
			history.push(`/view/${id}`);
		} else {
			history.push("/");
		}
	} catch (error) {
		dispatch(getSingleHotelFailure());
	}
};

export const editHotel = (data, id) => async (dispatch) => {
	let hotelData = new FormData();

	hotelData.append("hotelName", data.hotelName);
	hotelData.append("description", data.description);
	hotelData.append("price", data.price);
	hotelData.append("to", data.to);
	hotelData.append("from", data.from);
	hotelData.append("location", data.location);
	data.image && hotelData.append("image", data.image);
	hotelData.append("bed", data.bed);

	try {
		let res = await axios.put(`/hotel/${id}`, hotelData);
		if (res) {
			dispatch(editHotelSuccess(res.data));
			history.push(`/dashboard`);
			toast.success("Update operation successfull");
		}
	} catch (error) {
		toast.error("something went wrong");
	}
};

export const hotelBySeller = (token) => async (dispatch) => {
	try {
		let response = await axios.get("/hotel/sellerHotel", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response) {
			dispatch(getAllHotelSuccess(response.data));
		}
	} catch (error) {
		console.log("seller error");
	}
};

export const deleteHotel = (id) => async (dispatch) => {
	try {
		let res = await axios.delete(`/hotel/${id}`);
		if (res) {
			dispatch(deleteHotelSuccess());
			toast.success("delete operartion successful");
			history.push("/dashboard");
		}
	} catch (error) {
		toast.error("something wrong");
	}
};

export const handleAdminOperation = (id, operation) => async (dispatch) => {
	try {
		const data = { operation };
		let response = await axios.patch(`/hotel/${id}`, data);
		if (response) {
			dispatch(editHotelSuccess(response.data));
			window.location.reload();
		}
	} catch (error) {
		toast.error("something went wrong");
	}
};

export const isBookedHotel = (token, id) => async (dispatch) => {
	try {
		let res = await axios.get(`/hotel/isBooked/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res) {
			dispatch(bookedStatus(res.data));
		}
	} catch (error) {
		console.log("error");
	}
};

export const roomAvailable = () => async (dispatch) => {
	await dispatch(`/hotel/roomAvailable`);
};

export const cancelBooking = (id) => async (dispatch) => {
	try {
		let res = await axios.post(`/hotel/cancelBooking/${id}`);
		console.log(res);
	} catch (error) {
		console.log("error");
	}
};

export const booking_update_to_seller = (token) => async (dispatch) => {
	try {
		let res = await axios.get(`/hotel/booking_update_to_seller`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(res);
		if (res) {
			dispatch(userBookingsuccess(res.data));
		}
	} catch (error) {
		console.log("error");
	}
};

export const searchListing = (query) => async (dispatch) => {
	try {
		let res = await axios.post(`/hotel/search-listing`, query);
		if (res) {
			dispatch(searchResultSuccess(res.data));
		}
	} catch (error) {
		console.log("error");
	}
};
