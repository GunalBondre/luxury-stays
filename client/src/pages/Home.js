import React from "react";
import styled from "styled-components";
import homeImg from "../images/home.jpg";
const Main = styled.section`
	height: 100%;

	.hero {
		background: url(${homeImg});
		height: 400px;
		width: 100%;
		background-size: cover;
		border-radius: 20px;
		margin: 20px 0 40px 0;
	}
`;

const Home = () => {
	return (
		<div>
			<Main>
				<div className="container">
					<div className="hero">
						<div className="hero__content">
							<h1 className="title1 text-center">
								The best hotels of whole world
							</h1>
							<p className="para text-center">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Deserunt modi iste facere sapiente a, ipsum odio eveniet,
								debitis, nostrum voluptate accusamus aliquam voluptatum
								repudiandae ex architecto suscipit sed? Quis, saepe.
							</p>
						</div>
					</div>
				</div>
			</Main>
		</div>
	);
};

export { Home };
