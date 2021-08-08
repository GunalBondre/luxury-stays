import React, { useState } from "react";
import { Form, FormWrapper } from "../components/commonStyles/FormWrapper";
import { Button } from "../components/commonStyles/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
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

const RequestResetPassword = () => {
	const [state, setState] = useState({
		email: "",
	});
	const dispatch = useDispatch("");
	const handleForm = (e) => {
		e.preventDefault();
		dispatch(resetPassword(state.email));
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
						<h3 className="title3 text-center">Request Reset Password</h3>
						<div className="form-group">
							<input
								type="email"
								name="email"
								placeholder="Enter Email Address"
								className="form-control"
								id=""
								onChange={handleChange}
								value={state.email}
							/>
						</div>

						<Button>Request Reset Password</Button>
					</form>
				</Form_wrapper>
			</div>
		</div>
	);
};

export default RequestResetPassword;
