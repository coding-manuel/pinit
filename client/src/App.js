import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./theme";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Create from "./pages/Create.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from './pages/Landing.jsx'
import Demo from './pages/Demo.jsx'

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<Router>
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/note/create" component={Create} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/demo" component={Demo} />
				<Route path="/landing" component={Landing} />
				<Route path="/" exact>
					<Redirect to="/landing" />
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
