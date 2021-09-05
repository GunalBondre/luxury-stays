import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { emailVerification } from "../features/auth/authSlice";

const EmailVerification = () => {
	const dispatch = useDispatch();
	const { token, id } = queryString.parse(window.location.search);

	useEffect(() => {
		dispatch(emailVerification(token, id));
	}, []);
	return <div></div>;
};

export default EmailVerification;
