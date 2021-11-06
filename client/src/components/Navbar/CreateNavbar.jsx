import React, { useEffect, useState } from "react";
import { useTransition, config } from "react-spring";
import styled from "styled-components";
import Share from "../../assets/icons/share.svg";
import People from "../../assets/icons/people.svg";
import Settings from "../../assets/icons/settings.svg";
import Export from "../../assets/icons/export.svg";
import { useLocation } from "react-router";
import axios from "../../services/api";
import SharePopup from "../SharePopup/SharePopup.jsx";
import PeoplePopup from "../PeoplePopup/peoplePopup.jsx";

const Title = styled.h4`
	margin: 0;
	color: ${(props) => props.theme.color.white};
	font-weight: ${(props) => props.theme.typography.semibold};
	padding: 0.5rem 2rem;
	border-radius: 2px;
	outline: none;
	&:hover {
		outline: 1px ${(props) => props.theme.color.dark[3]} solid;
	}
	&:focus {
		outline: 2px ${(props) => props.theme.color.primary} solid;
	}
`;

const NavMenu = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const NavBtnLink = styled.a`
	border-radius: 4px;
	background: ${(props) => (props.primary ? "#800080" : "transparent")};
	padding: 5px;
	transform: scale(0.6);
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		transform: scale(0.7);
	}
`;

const ShareBtn = styled.a`
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.color.primary};
	padding: 3px 10px;
	border-radius: 5px;
	margin: 0 15px;
	cursor: pointer;
	transition: all 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.color.primaryDarken};
	}
`;

const ShareIcon = styled.div`
	transform: scale(0.6) translateY(3px);
`;

const ShareText = styled.h5`
	margin: 0;
	padding: 0 0 0 5px;
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

export default function CreateNavbar() {
	const [roomTitle, setRoomTitle] = useState("Untitled");
	const [showSharePopup, setShowSharePopup] = useState(false);
	const [showPeoplePopup, setShowPeoplePopup] = useState(false);

	const query = new URLSearchParams(useLocation().search);

	const roomID = query.get("roomID");
	const role = query.get("roomID");

	const transitionShare = useTransition(showSharePopup, {
		from: { scale: 0.8, opacity: 0 },
		enter: { scale: 1, opacity: 1 },
		leave: { scale: 0.8, opacity: 0 },
		config: config.stiff,
	});

	const transitionPeople = useTransition(showPeoplePopup, {
		from: { scale: 0.8, opacity: 0 },
		enter: { scale: 1, opacity: 1 },
		leave: { scale: 0.8, opacity: 0 },
		config: config.stiff,
	});

	const titleChange = (title) => {
		setRoomTitle(title);
		axios().post("/rooms/changeRoomTitle", { roomID: roomID, title: title });
	};

	const handleKeys = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.target.blur();
		}
	};

	useEffect(() => {
		axios()
			.get("/auth/user", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("user"),
				},
			})
			.then((resp) => {
				setTimeout(() => {
					axios()
						.post("/rooms/fetchRoomTitle", { roomID: roomID })
						.then((res) => {
							setRoomTitle(res.data);
						}),
						(err) => {
							console.log(err);
						};
				}, 1000);
			});
	}, []);

	return (
		<>
			<Title
				contentEditable={true}
				suppressContentEditableWarning={true}
				onBlur={(e) => titleChange(e.target.innerHTML)}
				onKeyDown={(e) => {
					handleKeys(e);
				}}
			>
				{roomTitle}
			</Title>
			<NavMenu>
				<ShareBtn onClick={() => setShowSharePopup(true)}>
					<ShareIcon>
						<Share />
					</ShareIcon>
					<ShareText>Share</ShareText>
				</ShareBtn>
				<NavBtnLink>
					<Export />
				</NavBtnLink>
				<NavBtnLink onClick={() => setShowPeoplePopup(true)}>
					<People />
				</NavBtnLink>
				<NavBtnLink>
					<Settings />
				</NavBtnLink>
			</NavMenu>
			{transitionShare((style, item) =>
				item ? (
					<SharePopup
						showSharePopup={showSharePopup}
						roomID={roomID}
						setShowSharePopup={setShowSharePopup}
						style={style}
					/>
				) : null
			)}
			{transitionPeople((style, item) =>
				item ? (
					<PeoplePopup
						showPeoplePopup={showPeoplePopup}
						roomID={roomID}
						setShowPeoplePopup={setShowPeoplePopup}
						style={style}
					/>
				) : null
			)}
		</>
	);
}
