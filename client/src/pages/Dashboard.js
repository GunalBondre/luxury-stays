import React, { useEffect } from "react";
import styled from "styled-components";
import { Tabs } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { hotelBySeller, getAllHotel } from "../features/hotel/hotelSlice";
import SellerHotelCard from "../components/SellerHotelCard";
import AdminCard from "../components/AdminCard";

const { TabPane } = Tabs;

const DashboardWrapper = styled.div`
	height: 100%;
	min-height: 100vh;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	width: 80%;
	background: #fff;
	margin: -100px auto 30px auto;
	z-index: 99;
	padding: 40px;
	border-radius: 10px;

	.ant-tabs-tab {
		font-size: 24px;
		padding-right: 15px;
	}
`;

const HeaderDiv = styled.div`
	.banner {
		width: 100%;
		height: 250px;
		background: linear-gradient(
			90deg,
			rgba(34, 108, 117, 0.36738445378151263) 0%,
			rgba(9, 9, 121, 1) 8%,
			rgba(0, 212, 255, 1) 100%
		);
	}
`;
const Dashboard = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { hotel } = hotelDetail;
	const dispatch = useDispatch();
	useEffect(() => {
		if (auth.user.roles === "seller") {
			dispatch(hotelBySeller(auth.user.token));
		}
		if (auth.user.roles === "admin") {
			dispatch(getAllHotel(auth.user.token));
		}
	}, [dispatch]);

	const SellerDashboard = () => {
		return (
			<>
				<DashboardWrapper>
					<h1 className="title1">Seller Dashboard</h1>;
					<Tabs defaultActiveKey="seller">
						<TabPane tab="Pending" key="pending" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "pending") {
									return <SellerHotelCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						<TabPane tab="Verified" key="verified" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "verified") {
									return <SellerHotelCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
					</Tabs>
				</DashboardWrapper>
			</>
		);
	};

	const AdminDashboard = () => {
		return (
			<>
				<DashboardWrapper>
					<h1 className="title1 text-center mb-4">Admin Dashboard</h1>
					<Tabs defaultActiveKey="admin">
						<TabPane tab="Pending" key="pending" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "pending") {
									return <AdminCard key={item._id} item={item} />;
								}
							})}{" "}
						</TabPane>
						<TabPane tab="Verified" key="verified" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "verified") {
									return <AdminCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						<TabPane tab="Rejected" key="rejected" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "rejected") {
									return <AdminCard key={item._id} item={item} />;
								}
							})}{" "}
						</TabPane>
						;
					</Tabs>
				</DashboardWrapper>
			</>
		);
	};
	// if (item.verifiedStatus && item.verifiedStatus === "pending") {
	// 	return (
	// 		<TabPane tab="Pending" key="1" className="tabs">
	// 			<AdminCard key={item._id} item={item} />;
	// 		</TabPane>
	// 	);

	// } else if (item.verifiedStatus === "verified") {
	// 	return (
	// 		<TabPane tab="Verified" key="2" className="tabs">
	// 			<AdminCard key={item._id} item={item} />;
	// 		</TabPane>
	// 	);
	// } else {
	// 	return (
	// 		<TabPane tab="Rejected" key="3" className="tabs">
	// 			<AdminCard key={item._id} item={item} />;
	// 		</TabPane>
	// 	);
	// }
	const UserDashboard = () => {
		return (
			<>
				<DashboardWrapper>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Upcoming" key="1" className="tabs">
							Upcoming Bookings
						</TabPane>
						<TabPane tab="Cancelled" key="2" className="tabs">
							Cancelled Bookings
						</TabPane>
						<TabPane tab="Completed" key="3" className="tabs">
							Completed Bookings
						</TabPane>
					</Tabs>
				</DashboardWrapper>
				;
			</>
		);
	};

	return (
		<div>
			<HeaderDiv>
				<div className="banner"></div>
			</HeaderDiv>
			{console.log(auth.user.roles)}
			{/* {auth.user.roles === "user" ? <UserDashboard /> : <SellerDashboard />} */}
			{auth.user.roles === "admin" && <AdminDashboard />}
			{auth.user.roles === "user" && <UserDashboard />}
			{auth.user.roles === "seller" && <SellerDashboard />}
		</div>
	);
};

export default Dashboard;
