import styled from "styled-components";
import signupImg from "../../images/hotel-booking-image.jpg";

export const FormWrapper = styled.div`
	margin-top: 50px;
	margin-bottom: 50px;
	display: flex;
	/* background-color: ${(props) => props.theme.primaryColor}; */
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	img {
		width: 100%;
		overflow: hidden;
		min-height: 495px;
	}

	.left-form {
		padding: 60px 60px 0 60px;

		@media (max-width: 767px) {
			padding: 30px 30px 0 30px;
		}
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: ${(props) => props.theme.secondaryColor};

	label {
		font-weight: 300;
	}

	.social-media-signup {
		display: flex;
		justify-content: space-evenly;
		padding: 20px 0;
	}

	.horizontal-line {
		width: 100%;
		position: relative;

		&:after {
			content: "";
			border-bottom: 1px solid black;
			position: absolute;
			top: 50%;
			left: 0;
			z-index: 1;
			height: 3px;
		}

		span {
			display: inline-block;
		}
	}
`;
