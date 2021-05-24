import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import hotelImg1 from "../images/hotelimage1.jpg";
import hotelImg2 from "../images/hotelimage2.jpg";
import hotelImg3 from "../images/hotelimage3.jpg";
import hotelImg4 from "../images/hotelimage4.jpg";
import styled from "styled-components";
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

const SliderContainer = styled.div`
	img {
		width: 100%;
		padding-right: 10px;
	}
`;

const Slider = ({ singleHotel }) => {
	return (
		<div>
			<SliderContainer>
				<Carousel
					swipeable={true}
					responsive={responsive}
					ssr={true} // means to render carousel on server-side.
					infinite={true}
					autoPlaySpeed={1000}
					keyBoardControl={true}
					customTransition="all 1"
					transitionDuration={1000}
					containerClass="carousel-container"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					dotListClass="custom-dot-list-style"
					itemClass="carousel-item-padding-40-px"
				>
					{console.log(singleHotel)}
					<div>
						<img src={`/hotel/image/${singleHotel._id}`} alt="" />
					</div>
					<div>
						<img src={`/hotel/image/${singleHotel._id}`} alt="" />
					</div>
					<div>
						<img src={`/hotel/image/${singleHotel._id}`} alt="" />
					</div>
					<div>
						<img src={`/hotel/image/${singleHotel._id}`} alt="" />
					</div>
					{/* <div>
						<img src={hotelImg2} alt="" />
					</div>
					<div>
						<img src={hotelImg3} alt="" />
					</div>
					<div>
						<img src={hotelImg4} alt="" />
					</div> */}
				</Carousel>
			</SliderContainer>
			;
		</div>
	);
};

export default Slider;
