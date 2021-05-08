import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import registerImg from "../images/hotel-booking-image.jpg";
import { Form, FormWrapper } from "../components/commonStyles/FormWrapper";
import { Button } from "../components/commonStyles/Button";
import { Link } from "react-router-dom";
import { register } from "../features/auth/authSlice";

const Register = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
	});

	const dispatch = useDispatch();

	const handleForm = async (e) => {
		e.preventDefault();
		dispatch(
			register({
				name: state.name,
				email: state.email,
				phone: state.phone,
				password: state.password,
			})
		);
	};
	const handleInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div>
			<div className="container">
				<FormWrapper>
					<Form onSubmit={handleForm}>
						<div className="row">
							<div className="col-lg-5 ">
								<div className="left-form">
									<h3 className=" title3">Personal Info</h3>

									<div className="form-group">
										<label for="exampleInputUser"> Name</label>

										<input
											type="text"
											name="name"
											id="name"
											onChange={handleInput}
											className="form-control"
											value={state.name}
										/>
									</div>

									<div className="form-group">
										<label for="exampleInputPhone"> Phone</label>

										<input
											type="number"
											name="phone"
											id="phone"
											onChange={handleInput}
											className="form-control"
											value={state.phone}
										/>
									</div>
									<div className="form-group">
										<label for="exampleInputEmail1">Email address</label>

										<input
											type="email"
											name="email"
											id="email"
											onChange={handleInput}
											className="form-control"
											value={state.email}
										/>
									</div>
									<div className="form-group">
										<label for="exampleInputPassword">Password</label>

										<input
											type="password"
											name="password"
											id="password"
											onChange={handleInput}
											className="form-control"
											value={state.password}
										/>
									</div>
									<Button>Sign Up</Button>
									{/* <div className="form-links my-4">
										<a href="">Forgot Password?</a>
									</div> */}
									<h4 className="horizontal-line text-center title4 mt-4">
										<span>or</span>
									</h4>
									<div className="social-media-signup my-3">
										<Link className="social-icon">
											<i className="fab fa-google"></i>
										</Link>
										<Link className="social-icon">
											<i className="fab fa-facebook-f"></i>
										</Link>
										<Link className="social-icon">
											<i className="fab fa-linkedin-in"></i>
										</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-7">
								<div className="signup-img">
									<img src={registerImg} alt="" />
								</div>{" "}
							</div>
						</div>
					</Form>{" "}
				</FormWrapper>
			</div>
		</div>
	);
};

export { Register };
