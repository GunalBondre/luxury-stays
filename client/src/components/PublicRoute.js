import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ ...rest }) => {
	const { auth } = useSelector((state) => ({ ...state }));
	return !auth.user ? <Route {...rest} /> : <Redirect to="/" />;
};

export default PublicRoute;
