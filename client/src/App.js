import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Login, Register, Home } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
function App() {
	return (
		<div className="App">
			<Header />
			<Router>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
