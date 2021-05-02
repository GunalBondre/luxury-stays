import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { Login, Register, Home } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import theme from "./components/commonStyles/theme";
import GolbalStyle from "./components/commonStyles/GlobalStyle";
import Footer from "./components/Footer";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<GolbalStyle />
				<Header />
				<Router>
					<Switch>
						<Route exact path="/" component={Home}></Route>
						<Route path="/login" component={Login}></Route>
						<Route path="/register" component={Register}></Route>
					</Switch>
				</Router>
				<Footer />
			</div>{" "}
		</ThemeProvider>
	);
}

export default App;
