import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "../services/api";
import { useDispatch } from "react-redux";
import { SET_USERID } from "../store/slices/userSlice";

const LoginPage = styled.div`
	min-height: 100vh;
	display: flex;
	background: ${(props) => props.theme.color.dark[0]};
	color: ${(props) => props.theme.color.white};
`;

const Container = styled.div`
	width: 360px;
	margin: auto;
	padding: 20px;
	background: ${(props) => props.theme.color.dark[1]};
	box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
		0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.14);
	border-radius: 5px;
`;

const InputCont = styled.div`
	margin: 0 0 1rem;
`;

const Input = styled.input`
	box-sizing: border-box;
	font-family: "open sans", sans-serif;
	color: ${(props) => props.theme.color.white};
	outline: 0px solid ${(props) => props.theme.color.primary};
	background: ${(props) => props.theme.color.dark[2]};
	height: 100%;
	width: 100%;
	border-radius: 5px;
	border: 0;
	padding: 15px;
	font-size: 14px;
	font-weight: ${(props) => props.theme.typography.regular};
	transition: all 0.1s ease-out;

	outline: ${(props) =>
		!props.valid && "2px solid " + props.theme.color.error};

	&:hover {
		background: ${(props) => props.theme.color.dark[3]};
	}

	&:active,
	&:focus {
		outline: 2px solid ${(props) => props.theme.color.primary};
	}
`;

const Button = styled.button`
	font-family: "open sans", sans-serif;
	background: ${(props) => props.theme.color.primary};
	color: ${(props) => props.theme.color.white};
	width: 100%;
	border-radius: 5px;
	border: 0;
	padding: 15px;
	margin: 2rem 0 0 0;
	font-size: 18px;
	font-weight: ${(props) => props.theme.typography.semibold};
	transition: all 0.1s ease-out;
	cursor: pointer;
	display: flex;
	justify-content: center;

	&:hover {
		background: ${(props) => props.theme.color.primaryDarken};
	}
`;

const Header = styled.h2`
	padding: 0 0 20px 0;
	font-weight: ${(props) => props.theme.typography.semibold};
`;

const Label = styled.h5`
	padding: 0 0 10px 0;
	font-weight: ${(props) => props.theme.typography.semibold};
`;

const Loader = styled.div`
	border: 5px solid #f3f3f3; /* Light grey */
	border-top: 5px solid ${(props) => props.theme.color.primary}; /* Blue */
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const SignInPrompt = styled.h5`
	padding: 20px 0 0 0;
`;

const Error = styled.h6`
	color: ${(props) => props.theme.color.error};
	font-weight: ${(props) => props.theme.typography.semibold};
	padding: 1rem 0 0 0;
`;

const SignInLink = styled(Link)`
	color: ${(props) => props.theme.color.white};
	text-decoration: none;
	font-weight: ${(props) => props.theme.typography.semibold};
	cursor: pointer;
`;

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [usernameError, setUsernameError] = useState(true);
	const [passwordError, setPasswordError] = useState(true);

	const dispatch = useDispatch();
	const history = useHistory();

	const validate = () => {
		let isValid = true;

		if (!username) {
			isValid = false;
			errors["username"] = "Please enter your username.";
			setUsernameError(false);
		} else if (username.length < 6 || username.length > 25) {
			isValid = false;
			errors["username"] = "Username must be between 6 and 25 characters.";
			setUsernameError(false);
		}

		if (!password) {
			isValid = false;
			errors["password"] = "Please enter your password.";
			setPasswordError(false);
		} else if (password.length < 6 || password.length > 25) {
			isValid = false;
			errors["password"] = "Password must be between 6 and 25 characters.";
			setPasswordError(false);
		}

		return isValid;
	};

	const login = (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		if (validate()) {
			axios()
				.post("/auth/login", {
					username: username,
					password: password,
				})
				.then(
					(res) => {
						localStorage.setItem("user", res.data.token);
						axios()
							.get("/auth/user", {
								headers: {
									Authorization: "Bearer " + res.data.token,
								},
							})
							.then((resp) => {
								setIsSubmitting(false);
								dispatch(SET_USERID(resp.data.userID));
								history.push({
									pathname: "/dashboard",
									search: `?userID=${resp.data.userID}`,
									state: { userID: resp.data.userID },
								});
							});
					},
					(error) => {
						setIsSubmitting(false);
						setPasswordError(false);
						setErrors({ ...errors, password: "Enter Valid Credentials" });
					}
				);
		} else setIsSubmitting(false);
	};

	useEffect(() => {
		if (localStorage.getItem("user")) {
			setIsSubmitting(true);
			axios()
				.post(
					"/auth/refreshToken",
					{},
					{
						headers: {
							Authorization: "Bearer " + localStorage.getItem("user"),
						},
					}
				)
				.then((res) => {
					localStorage.setItem("user", res.data.token);
					axios()
						.get("/auth/user", {
							headers: {
								Authorization: "Bearer " + res.data.token,
							},
						})
						.then((resp) => {
							setIsSubmitting(false);
							dispatch(SET_USERID(resp.data.userID));
							history.push({
								pathname: "/dashboard",
								search: `?userID=${resp.data.userID}`,
								state: { userID: resp.data.userID },
							});
						});
				});
		}
	}, []);
	return (
		<LoginPage>
			<Container>
				<Header>Log In</Header>
				<form onSubmit={login}>
					<InputCont>
						<Label>Username</Label>
						<Input
							placeholder="Username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								setUsernameError(true);
							}}
							valid={usernameError}
						/>
						{!usernameError && <Error>{errors["username"]}</Error>}
					</InputCont>
					<InputCont>
						<Label>Password</Label>
						<Input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setPasswordError(true);
							}}
							valid={passwordError}
						/>
						{!passwordError && <Error>{errors["password"]}</Error>}
					</InputCont>
					<Button type="submit">
						{!isSubmitting ? <>Log in</> : <Loader></Loader>}
					</Button>
				</form>
				<SignInPrompt>
					Don't have an account?{" "}
					<SignInLink to={"/register"}>Sign Up</SignInLink>
				</SignInPrompt>
			</Container>
		</LoginPage>
	);
}

export default Login;
