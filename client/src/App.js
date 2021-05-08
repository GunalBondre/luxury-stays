import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { Login, Register, Home } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import theme from "./components/commonStyles/theme";
import GolbalStyle from "./components/commonStyles/GlobalStyle";
import Footer from "./components/Footer";
import { Normalize } from "styled-normalize";
import HotelDetail from "./pages/HotelDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Counter } from "./features/counter/Counter";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import "antd/dist/antd.css";
import HotelRegister from "./pages/HotelRegister";
function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<ToastContainer />
				<Normalize />
				<GolbalStyle />
				<Header />
				<Router>
					<Switch>
						<Route exact path="/" component={Home}></Route>
						<PublicRoute path="/login" component={Login}></PublicRoute>
						<Route path="/counter" component={Counter}></Route>

						<PublicRoute path="/register" component={Register}></PublicRoute>
						<PrivateRoute
							path="/hotelDetail"
							component={HotelDetail}
						></PrivateRoute>
						<PrivateRoute
							path="/hotel-register"
							component={HotelRegister}
						></PrivateRoute>
						<PrivateRoute
							path="/dashboard"
							component={Dashboard}
						></PrivateRoute>
					</Switch>
				</Router>
				<Footer />
			</div>{" "}
		</ThemeProvider>
	);
}

export default App;
