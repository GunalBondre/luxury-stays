import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { handleAdminOperation } from "../features/hotel/hotelSlice";
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
const AdminCard = ({ item }) => {
	const dispatch = useDispatch();

	const handleApprove = (e) => {
		e.preventDefault();
		dispatch(handleAdminOperation(item._id, "approve"));
	};
	const handleReject = (e) => {
		e.preventDefault();
		dispatch(handleAdminOperation(item._id, "reject"));
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<SellerCard>
						<div className="col-md-4">
							<div className="imagesClass">
								<img
									src={`/hotel/image/${item._id}`}
									alt=""
									className="w-100"
								/>
							</div>
						</div>
						<div className="col-md-6 d-flex">
							<div className="description">
								<h3 className="title3">{item.hotelName}</h3>
								<p className="para1">{item.location}</p>
								<p className="para1">{item.description.substring(0, 100)}...</p>
								<span>Rs - {item.price}</span>
							</div>
						</div>
						<div className="col-md-2">
							<div className="buttonClass">
								{item.verifiedStatus === "verified" && (
									<>
										<StyledLink themebtn="true" onClick={handleReject}>
											Reject
										</StyledLink>
									</>
								)}
								{item.verifiedStatus === "rejected" && (
									<>
										<StyledLink themebtn="true" onClick={handleApprove}>
											Approve
										</StyledLink>
									</>
								)}
								{item.verifiedStatus === "pending" && (
									<>
										<StyledLink themebtn="true" to="" onClick={handleApprove}>
											Approve
										</StyledLink>
										<StyledLink themebtn="true" onClick={handleReject}>
											Reject
										</StyledLink>
									</>
								)}
							</div>
						</div>
					</SellerCard>
				</div>
			</div>
		</div>
	);
};

export default AdminCard;
