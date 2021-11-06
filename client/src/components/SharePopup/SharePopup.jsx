import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import axios from "../../services/api";
import Copy from "../../assets/icons/copy.svg";
import Reset from "../../assets/icons/reset.svg";

const PopupBack = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	transition: 0.3s ease-in;
	opacity: ${(props) => (props.showSharePopup ? 1 : 0)};
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
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 5px;
	background: ${(props) => props.theme.color.dark[1]};
	position: relative;
`;

const RoleCont = styled.div`
	margin: 20px 0px;
	width: 100%;
	height: 30px;
	display: flex;
	background: ${(props) => props.theme.color.dark[2]};
	border-radius: 5px;
`;

const ShareCont = styled.div`
	box-sizing: border-box;
	width: 100%;
	display: flex;
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

const Title = styled.h3`
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
	align-self: flex-start;
	margin: 0 0 20px 0;
`;

export default function ShareBoard({
	roomID,
	showSharePopup,
	setShowSharePopup,
	style,
}) {
	const [toastVisible, setToastVsible] = useState(false);
	const [role, setRole] = useState("Edit");
	const [roomInfo, setRoomInfo] = useState(null);
	const [toastContent, setToastContent] = useState("");
	const link = useRef(null);

	useEffect(() => {
		axios()
			.post("/rooms/fetchRoomInfo", { roomID: roomID })
			.then((res) => {
				setRoomInfo(res.data);
			});
	}, []);

	const resetLink = (role) => {
		axios()
			.post("/rooms/changeRoomShareLinks", { roomID: roomID, role: role })
			.then((res) => {
				axios()
					.post("/rooms/fetchRoomInfo", { roomID: roomID })
					.then((res) => {
						setRoomInfo(res.data);
					});
			});
	};

	const handleToast = (text) => {
		setToastContent(text);
		setToastVsible(true);
		setTimeout(() => {
			setToastVsible(false);
		}, 3000);
	};

	return (
		<PopupWrapper>
			<PopupBack
				onClick={() => {
					setShowSharePopup(false);
				}}
				showSharePopup={showSharePopup}
			></PopupBack>
			<PopupCont style={style}>
				<Title>Share Board</Title>
				<ShareCont>
					<ShareLinkCont>
						<ShareLink ref={link}>
							{roomInfo !== null
								? "https://pinit-notes.herokuapp.com/note/create?roomID=" +
								  roomInfo.roomID +
								  "&role=" +
								  (role === "Edit"
										? roomInfo.shareLinks.edit.trim()
										: roomInfo.shareLinks.view.trim())
								: null}
						</ShareLink>
						<CopyIcon
							onClick={() => {
								navigator.clipboard.writeText(link.current.outerText);
								handleToast("Link Copied");
							}}
						>
							<Copy />
						</CopyIcon>
					</ShareLinkCont>
					<ResetIcon
						onClick={() => {
							resetLink(role);
							handleToast("Link Reset");
						}}
					>
						<Reset />
					</ResetIcon>
				</ShareCont>
				<RoleCont>
					<RoleButton
						active={role === "Edit"}
						onClick={() => setRole("Edit")}
					>
						<h5>Edit</h5>
					</RoleButton>
					<RoleButton
						active={role === "View"}
						onClick={() => setRole("View")}
					>
						<h5>View</h5>
					</RoleButton>
				</RoleCont>
				<Toast toastVisible={toastVisible}>
					<ToastContent>{toastContent}</ToastContent>
				</Toast>
			</PopupCont>
		</PopupWrapper>
	);
}
