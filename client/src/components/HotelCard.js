import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "../components/commonStyles/Button";
import styled from "styled-components";
import { getSingleHotel } from "../features/hotel/hotelSlice";
import { useDispatch, useSelector } from "react-redux";

const CardComponent = styled.div`
	img {
		width: 100%;
	}
`;
const HotelCard = ({ item }) => {
	const { auth } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(getSingleHotel(item._id, auth.user.token));
	};
	return (
		<div className="col-lg-6 col-md-6 ">
			<CardComponent>
				<Card style={{ width: "100%" }} className="card mb-3">
					<Card.Img variant="top" src={`/hotel/image/${item._id}`} />
					<Card.Body>
						<Card.Title>{item.hotelName}</Card.Title>
						<Card.Text>{item.description.substring(0, 150)}...</Card.Text>
						<p className="para1 mt-2">
							<b>{`Available Rooms : ${item.bed}`}</b>
						</p>
						<p className="para1 mt-2">
							<b>Rs {item.price}</b>
						</p>
						<Button onClick={handleClick}>View More</Button>
					</Card.Body>
				</Card>
			</CardComponent>
		</div>
	);
};
// history.push(`/hotel/${item._id}`
export default HotelCard;
