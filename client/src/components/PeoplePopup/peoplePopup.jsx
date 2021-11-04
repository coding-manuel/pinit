import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { useSelector } from "react-redux";
import { io } from "../../services/socket";
import axios from "../../services/api";
import Copy from "../../assets/icons/copy.svg";
import Reset from "../../assets/icons/reset.svg";

const PopupBack = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	transition: 0.3s ease-in;
	opacity: ${(props) => (props.showPeoplePopup ? 1 : 0)};
`;

const PopupWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ShareLinkCont = styled.div`
	background: ${(props) => props.theme.color.dark[2]};
	width: 88%;
	height: 30px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 5px;
	transition: all 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.color.dark[3]};
	}
`;

const CopyIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	transition: all.2s ease-out;
	border-radius: 5px;
	&:hover {
		background: ${(props) => props.theme.color.dark[1]};
	}
`;

const ResetIcon = styled(CopyIcon)`
	margin-left: 10px;
	padding: 5px 10px;
	cursor: pointer;
	background: ${(props) => props.theme.color.dark[2]};
	&:hover {
		background: ${(props) => props.theme.color.dark[3]};
	}
`;

const ShareLink = styled.h5`
	color: ${(props) => props.theme.color.white};
	padding: 0 10px;
	flex-grow: 2;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	white-space: pre;
`;

const ToastContent = styled.h5`
	color: ${(props) => props.theme.color.white};
	font-weight: ${(props) => props.theme.typography.semibold};
`;

const PopupCont = styled(animated.div)`
	z-index: 10;
	width: 500px;
	min-height: 300px;
	max-height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 5px;
	background: ${(props) => props.theme.color.dark[1]};
	position: relative;
	overflow-y: scroll;
`;

const RoleCont = styled.div`
	margin: 20px 0px;
	width: 100%;
	height: 30px;
	display: flex;
	background: ${(props) => props.theme.color.dark[2]};
	border-radius: 5px;
`;

const UserSection = styled.div`
	width: 100%;
	margin: 1rem 0;
`;

const UserContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 0.5rem 0;
`;

const RoleButton = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	color: ${(props) => props.theme.color.white};
	transition: all 0.2s ease-out;
	cursor: pointer;
	background: ${(props) =>
		props.active ? props.theme.color.primary : "transparent"};
	&:hover {
		background: ${(props) => !props.active && props.theme.color.dark[3]};
	}
`;

const Toast = styled.div`
	position: absolute;
	bottom: ${(props) => (props.toastVisible ? "10px" : "0px")};
	opacity: ${(props) => (props.toastVisible ? 1 : 0)};
	transition: all 0.2s ease-out;
	display: flex;
	justify-content: center;
	width: 200px;
	height: 20px;
	border-radius: 5px;
	padding: 5px 0px;
	background: ${(props) => props.theme.color.dark[2]};
`;

const ProfilePicture = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 30px;
	padding: 5px;
	border: 2px solid ${(props) => props.theme.color.white};
`;

const Title = styled.h4`
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
	align-self: flex-start;
	margin: 0 0 20px 0;
`;

const UserName = styled.h5`
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
	margin: 0 2rem;
`;

export default function People({
	roomID,
	showPeoplePopup,
	setShowPeoplePopup,
	style,
}) {
	const { usersList } = useSelector((state) => state.reducer.user);
	return (
		<PopupWrapper>
			<PopupBack
				onClick={() => {
					setShowPeoplePopup(false);
				}}
				showPeoplePopup={showPeoplePopup}
			></PopupBack>
			<PopupCont style={style}>
				<UserSection>
					<Title>Owner</Title>
					{usersList.map((user) => {
						if (user.role === "owner") {
							return (
								<UserContainer>
									<ProfilePicture
										src={
											"https://avatars.dicebear.com/api/gridy/" +
											user.username +
											".svg"
										}
										alt=""
									/>
									<UserName>{user.username}</UserName>
								</UserContainer>
							);
						}
					})}
				</UserSection>
				<UserSection>
					<Title>Editor</Title>
					{usersList.map((user) => {
						if (user.role === "edit") {
							return (
								<UserContainer>
									<ProfilePicture
										src={
											"https://avatars.dicebear.com/api/gridy/" +
											user.username +
											".svg"
										}
										alt=""
									/>
									<UserName>{user.username}</UserName>
								</UserContainer>
							);
						}
					})}
					{usersList.filter((user) => user.role === "edit").length ===
						0 && (
						<UserName style={{ margin: 0 }}>No Editors Online</UserName>
					)}
				</UserSection>
				<UserSection>
					<Title>Viewers</Title>
					{usersList.map((user) => {
						if (user.role === "view") {
							return (
								<UserContainer>
									<ProfilePicture
										src={
											"https://avatars.dicebear.com/api/gridy/" +
											user.username +
											".svg"
										}
										alt=""
									/>
									<UserName>{user.username}</UserName>
								</UserContainer>
							);
						}
					})}
					{usersList.filter((user) => user.role === "view").length ===
						0 && (
						<UserName style={{ margin: 0 }}>No Viewers Online</UserName>
					)}
				</UserSection>
			</PopupCont>
		</PopupWrapper>
	);
}
