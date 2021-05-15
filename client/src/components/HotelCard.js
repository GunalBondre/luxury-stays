import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "../components/commonStyles/Button";
import hotel1 from "../images/hotel1.jpg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const CardComponent = styled.div``;
const HotelCard = ({ item }) => {
	const history = useHistory();
	return (
		<div className="col-lg-6 col-md-6 ">
			<CardComponent>
				<Card style={{ width: "100%" }} className="card">
					<Card.Img variant="top" src={`/hotel/image/${item._id}`} />
					<Card.Body>
						<Card.Title>{item.hotelName}</Card.Title>
						<Card.Text>{item.description.substring(1, 200)}...</Card.Text>
						<p className="para1">Rs {item.price}</p>
						<Button onClick={() => history.push(`/hotel/${item._id}`)}>
							view more
						</Button>
					</Card.Body>
				</Card>
			</CardComponent>
		</div>
	);
};

export default HotelCard;
