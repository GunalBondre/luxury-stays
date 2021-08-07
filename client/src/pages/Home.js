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
import SearchBar from "../components/SearchBar";

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
						top: 10px;
						transform: translate(-50%);
						left: 20px;
						/* padding-right: 100px; */
					}

					select {
						width: 100%;
						min-width: 150px;
						/* padding-left: 50px; */
						/* padding-top: 17px; */
						appearance: none;
					}

					option {
						padding-left: 10px;
					}
				}

				.form-control {
					border: none;
					outline: none;
					width: 100%;
					min-width: 140px;
					border-radius: 0px;
					margin-right: 10px;

					color: rgba(0, 0, 0, 0.85);

					&:focus {
						outline: none;
						box-shadow: none;
					}
				}

				.ant-select-selector {
					height: 51px;
					padding: 11px;
					border: none;
					outline: none;
					&:focus {
						border: none;
						outline: none;
					}
				}
				.ant-select-selection-item {
					color: rgba(0, 0, 0, 0.85);
				}
				.ant-select-focused .ant-select-selector,
				.ant-select-selector:focus,
				.ant-select-selector:active,
				.ant-select-open .ant-select-selector {
					border-color: #d9d9d9 !important;
					box-shadow: none !important;
				}
				.ant-picker-focused {
					box-shadow: none !important;
					border-color: #d9d9d9 !important;
				}
				.ant-select-arrow {
					padding-top: 8px;
				}
				/* label {
					font-size: 14px;
					margin-bottom: 0px;
					padding-left: 10px;
				} */

				#location {
					/* border-right: 1px dotted black; */
					padding-left: 40px;
					@media (max-width: 767px) {
						border-right: 1px solid black;
					}
				}

				input:focus {
					outline: none;
				}
				#abode {
					padding-left: 40px;
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
		if (auth && auth.user) {
			dispatch(getAllHotel(auth.user.roles));
		} else {
			dispatch(getAllHotel());
		}
	}, []);

	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { hotel } = hotelDetail;

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
							<SearchBar />
						</div>
					</div>
				</div>
			</Main>

			<ListingGrid>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
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
						{/* <div className="col-lg-3 col-md-12">
							<div className="rightSide">
								<h2 className="title2 mb-4">Filters</h2>
								<RangeSlider />
								<hr></hr>
								<CheckFilters />
								<hr />
							</div>
						</div> */}
					</div>
				</div>
			</ListingGrid>
		</div>
	);
};

export { Home };
