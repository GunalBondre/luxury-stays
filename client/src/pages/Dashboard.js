import React, { useEffect } from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import { isSameOrAfter } from "dayjs/plugin/isSameOrAfter";

import { useSelector, useDispatch } from "react-redux";
import {
	hotelBySeller,
	allHotelsAdmin,
	booking_update_to_seller,
} from "../features/hotel/hotelSlice";
import SellerHotelCard from "../components/SellerHotelCard";
import SellerCard from "../components/SellerCard";

import AdminCard from "../components/AdminCard";
import { userBookings } from "../features/payment/paymentSlice";
import dayjs from "dayjs";
import UserDashboardCard from "../components/UserDashboardCard";

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

		h2 {
			text-align: center;
			font-size: 30px;
			color: #fff;
			padding-top: 30px;
		}
	}
`;

const Dashboard = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { hotelDetail } = useSelector((state) => ({ ...state }));
	const { hotel } = hotelDetail;
	const { allBooking } = useSelector((state) => ({ ...state }));
	const { fetchBooking } = allBooking;
	const { userBooking } = hotelDetail;
	let now = dayjs(new Date()).format("YYYY-MM-DD");

	const dispatch = useDispatch();
	useEffect(() => {
		if (auth.user.roles === "seller") {
			dispatch(hotelBySeller(auth.user.token));
			dispatch(booking_update_to_seller(auth.user.token));
		}
		if (auth.user.roles === "admin") {
			dispatch(allHotelsAdmin(auth.user.token));
		}
		if (auth.user.roles === "user") {
			dispatch(userBookings(auth.user.token));
		}
	}, [dispatch]);

	const SellerDashboard = () => {
		return (
			<>
				<DashboardWrapper>
					<h1 className="title1">Seller Dashboard</h1>

					<Tabs defaultActiveKey="seller">
						<TabPane tab="Todays Bookings" key="today" className="tabs">
							{Object.values(userBooking).map((item) => {
								if (item.from === now) {
									return <SellerCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						<TabPane tab="Upcoming Bookings" key="upcoming" className="tabs">
							{Object.values(userBooking).map((item) => {
								if (item.from > now) {
									return <SellerCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						<TabPane tab="Completed Bookings" key="completed" className="tabs">
							{Object.values(userBooking).map((item) => {
								if (dayjs(item.to).isBefore(dayjs(now))) {
									return <SellerCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
					</Tabs>

					<hr />
					<Tabs defaultActiveKey="seller">
						<TabPane tab="Verified Hotels" key="verified" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "verified") {
									return <SellerHotelCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						<TabPane tab="Pending Hotels" key="pending" className="tabs">
							{Object.values(hotel).map((item) => {
								if (item.verifiedStatus === "pending") {
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

	const UserDashboard = () => {
		return (
			<>
				<DashboardWrapper>
					<Tabs defaultActiveKey="user">
						<TabPane tab="Upcoming" key="upcoming" className="tabs">
							{Object.values(fetchBooking).map((item) => {
								if (item.from > now) {
									return <UserDashboardCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						<TabPane tab="Completed" key="completed" className="tabs">
							{Object.values(fetchBooking).map((item) => {
								if (item.to < now) {
									return <UserDashboardCard key={item._id} item={item} />;
								}
							})}
						</TabPane>
						{/* <TabPane tab="Cancelled" key="cancelled" className="tabs"></TabPane> */}
					</Tabs>
				</DashboardWrapper>
				;
			</>
		);
	};

	return (
		<div>
			<HeaderDiv>
				<div className="banner">
					<h2>Dashboard</h2>
				</div>
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
