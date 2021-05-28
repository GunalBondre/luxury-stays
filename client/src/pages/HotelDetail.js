import React, { useState } from "react";
import Slider from "../components/Slider";
import styled from "styled-components";
import { Button } from "../components/commonStyles/Button";
import { useDispatch, useSelector } from "react-redux";
// import { getSingleHotel } from "../features/hotel/hotelSlice";
import { DatePicker, Select } from "antd";
import moment from "moment";

import { stripePay } from "../features/payment/paymentSlice";
import Form from "antd/lib/form/Form";

const InfoWrapper = styled.div`
	.hotelDescription {
		padding: 20px 0 10px 0;
	}
	.amenities {
		li {
			list-style: none;
			i {
				padding-right: 5px;
			}
		}
	}

	.roomType {
		padding: 10px 5px;
		border: 1px solid ${(props) => props.theme.lightGray};
		margin-bottom: 20px;
	}

	.rightSide {
		border: 1px solid ${(props) => props.theme.lightGray};
		padding: 15px;
		margin-top: 25px;
	}
`;

const HotelDetail = () => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		to: "",
		from: "",
	});
	const { to, from } = values;
	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { auth } = useSelector((state) => ({ ...state }));

	const { singleHotel } = hotelDetail;
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			stripePay(
				singleHotel._id,
				singleHotel.price,
				singleHotel.hotelName,
				to,
				from,
				auth.user.token
			)
		);
	};

	return (
		<div>
			<InfoWrapper>
				<Slider singleHotel={singleHotel} />
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="hotelDetails">
								<div className="hotelTitle">
									<h1 className="title1">{singleHotel.hotelName}</h1>
									<h5 className="title5">{singleHotel.location}</h5>
								</div>

								<div className="hotelDescription">
									<h3 className="title3">Description</h3>

									<p className="para1">{singleHotel.description}</p>
								</div>

								<div className="hotelAmenities text-padding">
									<h3 className="title3">Amenities</h3>
									<ul className="amenities d-flex flex-wrap justify-content-between">
										<li>
											<i className="fa fa-check"></i> AC
										</li>
										<li>
											<i className="fa fa-check"></i> WiFi
										</li>
										<li>
											<i className="fa fa-check"></i>TV
										</li>
										<li>
											<i className="fa fa-check"></i>House Keeping
										</li>
										<li>
											<i className="fa fa-check"></i>24*7 Checkin
										</li>
										<li></li>
									</ul>
								</div>

								<div className="hotelPolicies text-padding">
									<h3 className="title3">Hotel Policies</h3>
									<ul>
										<li>Checkin - 12</li>
										<li>Checkout - 11</li>
										<li>Couples allowed</li>
										<li>
											Guests can check in using any local or outstation ID proof
											(PAN card not accepted).
										</li>
										<li>
											As a complimentary benefit, your stay is now insured by
											Acko.
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<form onSubmit={handleSubmit}>
								<div className="rightSide text-padding">
									<div className="price text-padding">
										<h4 className="title4">Rs - {singleHotel.price}</h4>
										<span>Inclusive of all taxes</span>
									</div>
									<div className="roomType text-padding">Standard Room</div>

									<DatePicker
										placeholder="From date"
										className="form-control mb-2"
										onChange={(date, dateString) => {
											setValues({
												...values,
												from: dateString,
											});
										}}
										values={from}
										disabledDate={(current) =>
											current &&
											current.valueOf() < moment().subtract(1, "days")
										}
									/>
									<DatePicker
										placeholder="To date"
										className="form-control mb-2"
										onChange={(date, dateString) => {
											setValues({
												...values,
												to: dateString,
											});
										}}
										values={to}
										disabledDate={(current) =>
											current &&
											current.valueOf() < moment().subtract(1, "days")
										}
									/>

									<div className="couponSection my-2">
										<i className="fas fa-tags mx-2"></i>
										<span className="amount text-padding mx-2">
											10% Off coupon by Travelly
										</span>{" "}
										<input type="checkbox" name="coupon" id="" />
									</div>

									<div className="total text-padding d-flex justify-content-between">
										<p className="para1">Total Price</p>
										<h4 className="title4">Rs - {singleHotel.price}</h4>
									</div>
								</div>
								<div className="buyNow">
									<Button>Buy Now</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</InfoWrapper>
		</div>
	);
};

export default HotelDetail;
