import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSellerHotel } from "../features/hotel/hotelSlice";

const Dashboard = styled.section`
	width: 80%;
	margin: 0 auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const SellerDashboard = () => {
	const dispatch = useDispatch();
	return (
		<div>
			<Dashboard>
				<div className="container">
					<h1 className="title1 text-center p-3">Seller Dashboard</h1>

					<div className="hotelList">
						<div className="col-md-4 col-sm-6"></div>
						<div className="col-md-8 col-sm-6"></div>
					</div>
				</div>
			</Dashboard>
		</div>
	);
};

export default SellerDashboard;
