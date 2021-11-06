import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "../../services/api";

const LogOut = styled.button`
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.color.primary};
	padding: 5px;
	border: none;
	border-radius: 5px;
	margin: 5px;
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.color.primaryDarken};
	}
`;

const Username = styled.h5`
	margin: 0;
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

const LogOutText = styled.h6`
	margin: 0;
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

const ProfilePicture = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 30px;
	padding: 5px;
	margin: 0 2rem 0 1rem;
	cursor: pointer;
	transition: all 0.1s ease-out;

	&:hover {
		background: ${(props) => props.theme.color.dark[0]};
	}
`;

const UserNameContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
`;

export default function DashNavbar() {
	const history = useHistory();
	const [username, setUsername] = React.useState("");
	const logOut = () => {
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

	React.useEffect(() => {
		axios()
			.get("/auth/user", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("user"),
				},
			})
			.then((resp) => {
				setUsername(resp.data.username);
			});
	}, []);

	return (
		<>
			<UserContainer>
				<UserNameContainer>
					<LogOut onClick={logOut}>
						<LogOutText>Logout</LogOutText>
					</LogOut>
				</UserNameContainer>
				<ProfilePicture
					src={
						"https://avatars.dicebear.com/api/gridy/" + username + ".svg"
					}
					alt=""
				/>
			</UserContainer>
		</>
	);
}
