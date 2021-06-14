import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../components/commonStyles/Button";
import { editHotel } from "../features/hotel/hotelSlice";
import { deleteHotel } from "../features/hotel/hotelSlice";
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
const SellerHotelCard = ({ item }) => {
	const dispatch = useDispatch();

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(deleteHotel(item._id));
		window.location.reload();
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
								<p>Rooms Available - {item.bed}</p>
							</div>
						</div>
						<div className="col-md-2">
							<div className="buttonClass">
								<StyledLink themebtn="true" to={`/hotel/edit/${item._id}`}>
									Edit
								</StyledLink>
								<StyledLink themebtn="true" onClick={handleDelete}>
									Delete
								</StyledLink>
							</div>
						</div>
					</SellerCard>
				</div>
			</div>
		</div>
	);
};

export default SellerHotelCard;
