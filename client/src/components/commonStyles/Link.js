import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
	${(props) =>
		props.search &&
		css`
			height: 50px;
		`}
	${(props) =>
		props.themebtn &&
		css`
			background-color: ${(props) => props.theme.primaryColor};
			color: ${(props) => props.theme.secondaryColor};
			border: none;
			outline: none;
			width: 100%;
			padding: 10px;
			padding: 10px;
			margin: 10px auto auto auto;
			display: block;
			text-align: center;
		`}
`;
