import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "../services/api";
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
	width: 100%;
	height: 100%;
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

const Error = styled.h6`
	color: ${(props) => props.theme.color.error};
	font-weight: ${(props) => props.theme.typography.semibold};
	padding: 1rem 0 0 0;
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

const SignInLink = styled(Link)`
	color: ${(props) => props.theme.color.white};
	text-decoration: none;
	font-weight: ${(props) => props.theme.typography.semibold};
	cursor: pointer;
`;

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [usernameError, setUsernameError] = useState(true);
	const [passwordError, setPasswordError] = useState(true);
	const [emailError, setEmailError] = useState(true);
	const [confirmPasswordError, setConfirmPasswordError] = useState(true);

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

		if (!email) {
			isValid = false;
			errors["email"] = "Please enter your email address.";
			setEmailError(false);
		} else if (typeof email !== "undefined") {
			var pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);
			if (!pattern.test(email)) {
				isValid = false;
				errors["email"] = "Please enter valid email address.";
				setEmailError(false);
			}
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

		if (!confirmPassword) {
			isValid = false;
			errors["confirmPassword"] = "Please enter your password again.";
			setConfirmPasswordError(false);
		}

		if (
			typeof password !== "undefined" &&
			typeof confirmPassword !== "undefined"
		) {
			if (password != confirmPassword) {
				isValid = false;
				errors["confirmPassword"] = "Passwords don't match.";
				setConfirmPasswordError(false);
			}
		}

		return isValid;
	};

	const register = (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		if (validate()) {
			axios()
				.post("/auth/register", {
					email: email,
					username: username,
					password: password,
				})
				.then(
					(res) => {
						setIsSubmitting(false);
						axios()
							.get("/auth/user", {
								headers: {
									Authorization: "Bearer " + res.data.token,
								},
							})
							.then((resp) => {
								setIsSubmitting(false);
								history.push({
									pathname: "/dashboard",
									search: `?userID=${resp.data.userID}`,
									state: { userID: resp.data.userID },
								});
							});
					},
					(err) => {
						setIsSubmitting(false);
						if (err.response.data.errors.email) {
							setEmailError(false);
							setErrors({
								...errors,
								email: err.response.data.errors.email,
							});
						} else if (err.response.data.errors.username) {
							setUsernameError(false);
							setErrors({
								...errors,
								username: err.response.data.errors.username,
							});
						}
					}
				);
		} else setIsSubmitting(false);
	};
	return (
		<LoginPage>
			<Container>
				<Header>Register</Header>
				<form onSubmit={register}>
					<InputCont>
						<Label>Email Address</Label>
						<Input
							placeholder="Email Address"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setEmailError(true);
							}}
							valid={emailError}
						/>
						{!emailError && <Error>{errors["email"]}</Error>}
					</InputCont>
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
						<Label>Set Password</Label>
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
					<InputCont>
						<Label>Confirm Password</Label>
						<Input
							placeholder="Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setConfirmPasswordError(true);
							}}
							valid={confirmPasswordError}
						/>
						{!confirmPasswordError && (
							<Error>{errors["confirmPassword"]}</Error>
						)}
					</InputCont>
					<Button type="submit">
						{!isSubmitting ? <>Sign Up</> : <Loader></Loader>}
					</Button>
				</form>
				<SignInPrompt>
					Already have an account?{" "}
					<SignInLink to={"/login"}>Log in</SignInLink>
				</SignInPrompt>
			</Container>
		</LoginPage>
	);
}

export default Register;
