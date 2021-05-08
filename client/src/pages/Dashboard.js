import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const DashboardWrapper = styled.div`
	height: 100vh;
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
	return (
		<div>
			<HeaderDiv>
				<div className="banner"></div>
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
			</HeaderDiv>
		</div>
	);
};

export default Dashboard;
