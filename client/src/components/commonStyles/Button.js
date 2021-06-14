import styled, { css } from "styled-components";

export const Button = styled.button`
	background-color: ${(props) => props.theme.primaryColor};
	color: ${(props) => props.theme.secondaryColor};
	border: none;
	outline: none;
	width: 100%;
	padding: 10px;
	padding: 10px;
	/* margin: 10px auto auto auto; */

	${(props) =>
		props.search &&
		css`
			height: 50px;
		`}
`;
