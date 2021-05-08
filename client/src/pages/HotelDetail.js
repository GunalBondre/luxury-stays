import React from "react";
import Slider from "../components/Slider";
import styled from "styled-components";
import { Button } from "../components/commonStyles/Button";

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
	return (
		<div>
			<InfoWrapper>
				<Slider />
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="hotelDetails">
								<div className="hotelTitle">
									<h1 className="title1">Golden Pearl Park</h1>
									<h5 className="title5">Karve Nagar near bus stop pune</h5>
								</div>

								<div className="hotelDescription">
									<h3 className="title3">Description</h3>

									<p className="para1">
										Lorem ipsum dolor sit, amet consectetur adipisicing elit.
										Voluptatum, laborum. Perspiciatis doloribus earum
										praesentium deserunt officia a impedit quas provident illo
										temporibus quis corporis cum, quasi perferendis voluptates.
									</p>
								</div>

								<div className="hotelAmenities text-padding">
									<h3 className="title3">Amenities</h3>
									<ul class="amenities d-flex flex-wrap justify-content-between">
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
							<div className="rightSide text-padding">
								<div className="price text-padding">
									<h4 className="title4">Rs - 999</h4>
									<span>Inclusive of all taxes</span>
								</div>
								<div className="roomType text-padding">Standard Room</div>
								<div className="couponSection ">
									<i className="fas fa-tags mx-2"></i>
									<span className="amount text-padding mx-2">
										10% Off coupon by Travelly
									</span>{" "}
									<input type="checkbox" name="coupon" id="" />
								</div>
								<div className="couponSection text-padding ">
									<i className="fas fa-tags mx-2"></i>
									<span className="amount text-padding mx-2">
										Save 5% by Hdfc bank card
									</span>{" "}
									<input type="checkbox" name="coupon" id="" />
								</div>
								<div className="total text-padding d-flex justify-content-between">
									<p className="para1">Total Price</p>
									<h4 className="title4">Rs - 999</h4>
								</div>
								<div className="buyNow">
									<Button>Buy Now</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</InfoWrapper>
		</div>
	);
};

export default HotelDetail;
