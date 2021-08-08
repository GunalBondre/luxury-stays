import React, { useState, useEffect } from "react";
import { Form, FormWrapper } from "../components/commonStyles/FormWrapper";
import { Button } from "../components/commonStyles/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updatePassword } from "../features/auth/authSlice";
import queryString from "query-string";
const Form_wrapper = styled.div`
	width: 40%;
	margin: 0 auto;
	height: 70vh;
	@media (max-width: 767px) {
		width: 100%;
	}
	form {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.form-group {
			width: 100%;
		}
	}
`;

const ResetPassword = () => {
	const [state, setState] = useState({
		password: "",
		confirmPassword: "",
	});
	const dispatch = useDispatch("");

	const { token, id } = queryString.parse(window.location.search);
	console.log(token, id);

	const handleForm = (e) => {
		e.preventDefault();
		dispatch(updatePassword(state.password, state.confirmPassword, token, id));
	};
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div>
			<div className="container ">
				<Form_wrapper>
					<form onSubmit={handleForm}>
						<h3 className="title3 text-center">Reset Password</h3>
						<div className="form-group">
							<input
								type="password"
								name="password"
								placeholder="Enter password"
								className="form-control"
								id=""
								onChange={handleChange}
								value={state.password}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								name="confirmPassword"
								placeholder="Re-enter password"
								className="form-control"
								id=""
								onChange={handleChange}
								value={state.confirmPassword}
							/>
						</div>
						<Button>Reset Password</Button>
					</form>
				</Form_wrapper>
			</div>
		</div>
	);
};

export default ResetPassword;
