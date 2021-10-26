import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "../../services/api";

const LogOut = styled.button`
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.color.primary};
	padding: 10px;
	border: none;
	border-radius: 5px;
	margin: 0 15px;
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.color.primaryDarken};
	}
`;

const LogOutText = styled.h5`
	margin: 0;
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

export default function DashNavbar() {
	const history = useHistory();
	const logOut = () => {
		console.log("logout");
		axios()
			.get("/auth/logout", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("user"),
				},
			})
			.then((res) => console.log(res));
		localStorage.clear();
		history.push("/login");
	};

	return (
		<>
			<LogOut onClick={logOut}>
				<LogOutText>Logout</LogOutText>
			</LogOut>
		</>
	);
}
