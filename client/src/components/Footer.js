import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
	background-color: ${(props) => props.theme.primaryColor};
	padding: 20px 0;
	color: ${(props) => props.theme.secondaryColor};
`;

const Footer = () => {
	return (
		<FooterWrapper>
			<div className="my-4">
				<h5 className="text-center">Copyright @2021 Travelly.com</h5>
			</div>
		</FooterWrapper>
	);
};

export default Footer;
