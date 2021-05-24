import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import homeImg from "../images/home.jpg";
import { Button } from "../components/commonStyles/Button";

import RangeSlider from "../components/RangeSlider";
import CheckFilters from "../components/CheckFilters";
import { getAllHotel } from "../features/hotel/hotelSlice";
import HotelCard from "../components/HotelCard";

const Main = styled.section`
	height: 100%;

	.hero {
		background: url(${homeImg});
		height: 400px;
		@media (max-width: 991px) {
			height: 100vh;
		}
		width: 100%;
		background-size: cover;
		border-radius: 20px;
		margin: 20px 0 40px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.title1 {
			color: ${(props) => props.theme.secondaryColor};
		}
		&__search-bar {
			background-color: #ffffff;
			/* margin: 0 40px; */
			padding: 10px 20px;
			width: 80%;
			margin: 0 auto;
			@media (max-width: 767px) {
				margin: 0;
			}
			form {
				display: flex;
				justify-content: space-evenly;
				@media (max-width: 991px) {
					flex-direction: column;
				}
				.form-group {
					display: flex;
					position: relative;
					flex-direction: column;
					i {
						position: absolute;
						top: 50%;
						transform: translate(-50%);
						left: 10px;
					}

					select {
						width: 100%;
						min-width: 150px;
						padding-left: 10px;
					}
					option {
						padding-left: 10px;
					}
				}

				.form-control {
					border: none;
					outline: none;
					width: 100%;
					min-width: 200px;
					border-radius: 0px;
					padding: 0 10px;
					&:focus {
						outline: none;
						box-shadow: none;
					}
				}
				label {
					font-size: 14px;
					margin-bottom: 0px;
					padding-left: 10px;
				}

				#location {
					/* border-right: 1px dotted black; */
					padding-left: 20px;
					@media (max-width: 767px) {
						border-right: 1px solid black;
					}
				}
				input[type="date"]::-webkit-calendar-picker-indicator,
				input[type="date"]::-webkit-inner-spin-button {
					display: none;
				}
				input[type="date"] {
					padding-left: 20px;
				}
				input:focus {
					outline: none;
				}
				#abode {
					padding-left: 20px;
				}
			}
		}
	}
`;

const ListingGrid = styled.div`
	.col-lg-4 {
		margin-bottom: 20px;
	}

	.form-select {
		width: 100%;
		padding: 7px;
		background-color: ${(props) => props.theme.primaryColor};
		color: ${(props) => props.theme.secondaryColor};
		border-radius: 5px;
	}

	.rightSide {
		@media (max-width: 991px) {
			display: none;
		}
	}
`;

const Home = () => {
	// const [startDate, setStartDate] = useState(new Date());
	// const [hotels, setHotels] = useState();
	const { auth } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllHotel(auth.user.token, auth.user.roles));
	}, []);

	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { hotel } = hotelDetail;
	const handleSubmit = () => {};
	const handleChange = () => {};
	return (
		<div>
			<Main>
				<div className="container">
					<div className="hero">
						<div className="hero__content">
							<h1 className="title1 text-center">
								The best hotels of whole world
							</h1>
							<p className="para text-center">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Deserunt modi iste facere sapiente a, ipsum odio eveniet,
								debitis, nostrum voluptate accusamus aliquam voluptatum
								repudiandae ex architecto suscipit sed? Quis, saepe.
							</p>
						</div>

						<div className="hero__search-bar ">
							<form action="" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="">Location</label>
									<i className="fa fa-map-marker"></i>
									<select
										name="location"
										onChange={handleChange}
										id="location"
										className="form-control"
									>
										<option value="disabled">Choose City.</option>
										<option value="Pune">Pune</option>
										<option value="Bangalore">Bangalore</option>
										<option value="Mumbai">Mumbai</option>
										<option value="Delhi">Delhi</option>
									</select>
								</div>

								{/* <div className="datepicker d-flex"> */}
								<div className="form-group">
									<label htmlFor="">Check In</label>
									<i className="fas fa-calendar-week"></i>
									<input
										type="date"
										name="checkin"
										onChange={handleChange}
										id="date"
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="">Check Out</label>
									<i className="fas fa-calendar-week"></i>
									<input
										type="date"
										name="checkin"
										onChange={handleChange}
										id="date"
										className="form-control"
									/>
								</div>
								{/* </div> */}
								<div className="form-group">
									<label htmlFor="">People</label>
									<i className="fa fa-user"></i>
									<select
										name="abode"
										id="abode"
										name="abode"
										onChange={handleChange}
										className="form-control"
									>
										<option value="Pune">2 adults </option>
										<option value="Bangalore">3 adults </option>
										<option value="Mumbai">4 adults</option>
										<option value="Delhi">5 adults</option>
									</select>
								</div>
								<Button search className="">
									Search
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Main>

			<ListingGrid>
				<div className="container">
					<div className="row">
						<div className="col-lg-9 col-md-12">
							<div className="searchContainer">
								<form action="">
									<div className="row">
										<div className="col-lg-8">
											<div className="form-group">
												<input
													type="text"
													name="search"
													id=""
													className="form-control"
													placeholder="Search"
												/>
											</div>
										</div>
										<div className="col-md-4">
											<select
												className="form-select"
												aria-label="Default select example"
											>
												<option selected>Newest</option>
												<option value="1">Cheapest</option>
												<option value="2">Most Popular</option>
											</select>
										</div>
									</div>
								</form>
							</div>
							<div className="row">
								{Object.values(hotel).map((item) => {
									return <HotelCard key={item._id} item={item} />;
								})}
							</div>
						</div>
						<div className="col-lg-3 col-md-12">
							<div className="rightSide">
								<h2 className="title2 mb-4">Filters</h2>
								<RangeSlider />
								<hr></hr>
								<CheckFilters />
								<hr />
							</div>
						</div>
					</div>
				</div>
			</ListingGrid>
		</div>
	);
};

export { Home };
