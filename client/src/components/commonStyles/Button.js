import styled from "styled-components";

export const Button = styled.button`
	width: 100%;
	background-color: ${(props) => props.theme.primaryColor};
	color: ${(props) => props.theme.secondaryColor};
	border: none;
	outline: none;
	padding: 5px 0;
`;
