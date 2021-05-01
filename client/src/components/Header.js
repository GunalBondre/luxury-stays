import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const Header = () => {
	return (
		<div>
			<Navbar bg="light" expand="lg">
				<div className="container">
					<Navbar.Brand href="/">Travelly</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link href="/login">Login</Nav.Link>
							<Nav.Link href="/register">Signup</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>
		</div>
	);
};

export default Header;
