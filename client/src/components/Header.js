import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const Header = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { name } = auth;
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem("auth");
	};
	return (
		<div className="mb-4">
			<Navbar bg="light" expand="lg">
				<div className="container">
					<Navbar.Brand href="/">Travelly</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{auth.user === null && (
							<Nav className="ml-auto">
								<Nav.Link href="/login">Login</Nav.Link>
								<Nav.Link href="/register">Signup</Nav.Link>
							</Nav>
						)}
						{auth.user !== null && (
							<Nav className="ml-auto">
								<NavDropdown
									title={auth.user.name}
									className="text-capitalize"
									id="basic-nav-dropdown"
								>
									<NavDropdown.Item href="/dashboard">
										Dashboard
									</NavDropdown.Item>
									<NavDropdown.Item href="#">Profile</NavDropdown.Item>
									<NavDropdown.Item href="#">Setting</NavDropdown.Item>
									<NavDropdown.Item href="/hotel-register">
										List Your Hotel
									</NavDropdown.Item>

									<NavDropdown.Item href="/login" onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						)}
					</Navbar.Collapse>
				</div>
			</Navbar>
		</div>
	);
};

export default Header;
