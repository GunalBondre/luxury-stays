import React, { useState } from "react";
import registerImg from "../images/hotel-booking-image.jpg";
import styled from "styled-components";

const FormWrapper = styled.div`
	padding-top: 50px;
	display: flex;
	img {
		width: 100%;
	}
`;

const Register = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleForm = (e) => {};
	const handleInput = (e) => {
		setState({
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div>
			<div className="container">
				<FormWrapper>
					<form onSubmit={handleForm}>
						<div className="row">
							<div className="col-md-5">
								<h3 className="text-center">Personal Info</h3>

								<div className="form-group">
									<input
										type="text"
										name="name"
										placeholder="name"
										id="name"
										onChange={handleInput}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="email"
										name="email"
										placeholder="email"
										id="email"
										onChange={handleInput}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="password"
										name="password"
										placeholder="password"
										id="password"
										onChange={handleInput}
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-md-7">
								<img src={registerImg} alt="" />
							</div>
						</div>

						<button className="btn btn-primary">Sign Up</button>
					</form>
				</FormWrapper>
			</div>
		</div>
	);
};

export { Register };
