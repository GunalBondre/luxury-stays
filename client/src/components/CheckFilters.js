import React from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
	.form-check {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
`;

const CheckFilters = () => {
	return (
		<div>
			<FilterWrapper>
				<div className="firstFilter">
					<h5 className="title5"> Facilities</h5>
					<form action="">
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								Internet
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								Tv
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>{" "}
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								WiFi
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>{" "}
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								Kitchen
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>
					</form>
					<a href="">+View More</a>
				</div>
				<hr />
				<div className="secondFilter">
					<h5 className="title5">Categories</h5>
					<form action="">
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								<p>
									<b>Premium Rooms -</b> Hotels at prime location and prime
									facilities
								</p>
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								<p>
									<b>Travelly Rooms -</b> Super affordable rooms
								</p>
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>{" "}
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								<p>
									<b>Town House -</b> Firendly neighbour hotel serviced by
									travelly
								</p>
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>{" "}
						<div className="form-check">
							<label className="form-check-label" for="flexCheckDefault">
								<p>
									<b>FlagShip -</b> Affordable hotels at prime location
								</p>
							</label>
							<input type="checkbox" className="form-check-input" />
						</div>
					</form>
				</div>
			</FilterWrapper>
		</div>
	);
};

export default CheckFilters;
