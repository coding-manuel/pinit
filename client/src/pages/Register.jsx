import React, { useState, useContext } from "react";
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

const Input = styled.input`
	box-sizing: border-box;
	font-family: "open sans", sans-serif;
	color: ${(props) => props.theme.color.white};
	outline: 0px solid ${(props) => props.theme.color.primary};
	background: ${(props) => props.theme.color.dark[2]};
	width: 100%;
	border-radius: 5px;
	border: 0;
	margin: 0 0 20px;
	padding: 15px;
	font-size: 14px;
	font-weight: ${(props) => props.theme.typography.regular};
	transition: all 0.1s ease-out;

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
	margin: 10px 0 0 0;
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

const WarningLabel = styled.div`
	padding: 10px 0 0 0;
	color: red;
	font-weight: ${(props) => props.theme.typography.semibold};
`;

const Message = styled.p`
	margin: 15px 0 0;
	color: #b3b3b3;
	font-size: 12px;
	a {
		color: purple;
		text-decoration: none;
	}
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
	const [error, setError] = useState({}); // server side errors
	const [errors, setErrors] = useState({});

	const history = useHistory();

	const validate = () => {
		let isValid = true;

		if (!username) {
			isValid = false;
			errors["username"] = "Please enter your username.";
		}

		if (!email) {
			isValid = false;
			errors["email"] = "Please enter your email Address.";
		}

		if (typeof email !== "undefined") {
			var pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);
			if (!pattern.test(email)) {
				isValid = false;
				errors["email"] = "Please enter valid email address.";
			}
		}

		if (!password) {
			isValid = false;
			errors["password"] = "Please enter your password.";
		}

		if (!confirmPassword) {
			isValid = false;
			errors["confirmPassword"] = "Please enter your confirm password.";
		}

		if (
			typeof password !== "undefined" &&
			typeof confirmPassword !== "undefined"
		) {
			if (password != confirmPassword) {
				isValid = false;
				errors["password"] = "Passwords don't match.";
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
						if (!res.status === 200) {
							if (res.status === 400) {
								setError("Please fill all the fields correctly!");
							} else if (res.status === 401) {
								setError("Invalid email and password combination.");
							} else if (res.status === 500) {
								if (res.data.message)
									setError(
										res.data.message || "Please try again later"
									);
							} else {
								setError("Please try again later");
							}
						} else {
							setIsSubmitting(false);
							axios()
								.get("/auth/user", {
									headers: {
										Authorization: "Bearer " + res.data.token,
									},
								})
								.then(
									(resp) => {
										setIsSubmitting(false);
										history.push({
											pathname: "/dashboard",
											search: `?userID=${resp.data.userID}`,
											state: { userID: resp.data.userID },
										});
									},
									(err) => {
										setError(error);
									}
								);
						}
					},
					(error) => {
						setIsSubmitting(false);
						setError(error);
					}
				);
		} else setIsSubmitting(false);
	};
	return (
		<LoginPage>
			<Container>
				<Header>Register</Header>
				<form onSubmit={register}>
				<Label>Email Address</Label>
				<Input
					placeholder="Email Address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Label>Username</Label>
				<Input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Label>Set Password</Label>
				<Input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Label>Confirm Password</Label>
				<Input
					placeholder="Password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<Button type="submit">
					{!isSubmitting ? <>Sign Up</> : <Loader></Loader>}
				</Button>
				</form>
				<SignInPrompt>
					Already have an account?{" "}
					<SignInLink to={"/login"}>Log in</SignInLink>
				</SignInPrompt>
				<Message className="message">
					{/* Not registered? <Link to="/Signup">Create an account</Link> */}
				</Message>
			</Container>
		</LoginPage>
	);
}

export default Register;
