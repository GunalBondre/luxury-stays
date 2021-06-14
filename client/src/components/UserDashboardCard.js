import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { cancelBooking } from "../features/hotel/hotelSlice";
import { StyledLink } from "../components/commonStyles/Link";

const SellerCard = styled.div`
	display: flex;
	.row {
		width: 100%;
	}
	margin-bottom: 40px;
	img {
		max-width: 500px;
	}

	.para {
		padding: 10px 0;
	}
`;
const UserDashboardCard = ({ item }) => {
	const dispatch = useDispatch();

	const handleReject = (e) => {
		e.preventDefault();
		dispatch(cancelBooking(item._id));
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<SellerCard>
						<div className="col-md-4">
							<div className="imagesClass">
								<img
									src={`/hotel/image/${item.id._id}`}
									alt=""
									className="w-100"
								/>
							</div>
						</div>
						<div className="col-md-6 d-flex">
							<div className="description">
								<h3 className="title3">{item.id.hotelName}</h3>
								<p className="para1">{item.id.location}</p>
								<p className="para1">
									{item.id.description.substring(0, 100)}...
								</p>
								<span>Rs - {item.id.price}</span>
							</div>
						</div>
						<div className="col-md-2">
							<div className="buttonClass">
								<StyledLink themebtn="true" onClick={handleReject}>
									Cancel
								</StyledLink>
							</div>
						</div>
					</SellerCard>
				</div>
			</div>
		</div>
	);
};

export default UserDashboardCard;
