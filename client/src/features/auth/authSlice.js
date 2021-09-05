import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "morgan";
import { toast } from "react-toastify";
import history from "../../history";

// check if user is available in local stoarage
const initialUser = localStorage.getItem("auth")
	? JSON.parse(localStorage.getItem("auth"))
	: null;

// create sloce function
const authSlice = createSlice({
	name: "user",
	initialState: {
		user: initialUser,
	},

	reducers: {
		loginRequest: (state) => {
			state.isLoading = true;
		},
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state) => {
			state.isLoading = false;
			return state;
		},
		registerSuccess: (state, action) => {
			state.user = action.payload;
		},
		registerFailure: (state) => {
			return state;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const {
	loginFailure,
	loginSuccess,
	registerSuccess,
	registerFailure,
	loginRequest,
} = authSlice.actions;

export const userSelector = (state) => state.user;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
	try {
		const userData = {
			name: user.name,
			email: user.email,
			password: user.password,
			phone: user.phone,
		};
		const response = await axios.post("/auth/register", userData);

		if (response) {
			console.log("data is ", response.data);
			dispatch(registerSuccess(response.data));
			toast.success("Registration Successful. You can now login");
			history.push("/login");
		} else {
			console.log("error");
			dispatch(registerFailure());
			toast.error("registration failed");
		}
	} catch (error) {
		if (error.response.status === 400) toast.error(error.response.data);
		dispatch(registerFailure());
	}
};

export const login = (user) => async (dispatch) => {
	dispatch(loginRequest());
	try {
		const userData = {
			email: user.email,
			password: user.password,
		};

		const response = await axios.post("/auth/login", userData, {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		console.log(response);
		if (response) {
			localStorage.setItem("auth", JSON.stringify(response.data));
			dispatch(loginSuccess(response.data));
			history.push("/");
			toast.success("login Successful");
		} else {
			dispatch(loginFailure());
		}
	} catch (error) {
		dispatch(loginFailure());
		if (error.response.status === 400) toast.error(error.response.data);
	}
};

export const logout = () => async (dispatch) => {
	dispatch(logout());
};

export const resetPassword = (email) => async (dispatch) => {
	const userData = { email: email };
	try {
		const response = await axios.post("/auth/requestResetPass", userData);
		if (response) {
			toast.success("please check email");
		}
	} catch (error) {
		if (error.response.status === 400) toast.error(error.response.data);
	}
};

export const updatePassword =
	(password, confirmPassword, token, id) => async (dispatch) => {
		const userData = {
			password,
			confirmPassword,
			token,
			id,
		};

		try {
			let result = await axios.post("/auth/resetPass", userData);
			if (result) {
				toast.success("password updated successfully");
				history.push("/login");
			} else {
				toast.error("something went wrong");
			}
		} catch (error) {
			if (error.response.status === 400) toast.error(error.response.data);
		}
	};

export const emailVerification = (token, id) => async (duspatch) => {
	try {
		const userData = { token, id };
		let result = await axios.post("/auth/emailVerification", userData);
		if (result) {
			history.push("/login");
		} else {
			toast.error("invalid or expired link");
		}
	} catch (error) {}
};
