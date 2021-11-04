import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./theme";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Create from "./pages/Create.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<Router>
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/note/create" component={Create} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/" exact>
					<Redirect to={"/register"} />
				</Route>
			</Router>
		</ThemeProvider>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem("user") ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default App;
