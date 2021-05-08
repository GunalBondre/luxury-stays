import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PriceSlider = styled.div`
	display: flex;

	input {
	}
`;
const RangeSlider = () => {
	const [price, setPrice] = useState(499);

	const handleChange = (e) => {
		setPrice({
			...price,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div>
			<div className="sliderParent">
				<h5 className="title5">Price</h5>

				<input
					type="range"
					name="range"
					id="range"
					min="499"
					max="10000"
					step="500"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default RangeSlider;
