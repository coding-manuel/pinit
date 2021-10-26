import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Share from "../../assets/icons/share.svg";
import People from "../../assets/icons/people.svg";
import Settings from "../../assets/icons/settings.svg";
import Export from "../../assets/icons/export.svg";
import { useLocation } from "react-router";
import axios from "../../services/api";

const Title = styled.h4`
	margin: 0;
	color: ${(props) => props.theme.color.white};
	font-weight: ${(props) => props.theme.typography.semibold};
	padding: 0 1rem;
	outline: none;
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
	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}

	let query = useQuery();
	const roomID = query.get("roomID");

	const [roomTitle, setRoomTitle] = useState("Untitled");

	const titleChange = (title) => {
		setRoomTitle(title);
		axios()
			.post("/rooms/changeRoomTitle", { roomID: roomID, title: title })
			.then((res) => {
				console.log("success");
			});
	};

	const handleKeys = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.target.blur();
		}
	};

	useEffect(() => {
		axios()
			.post("/rooms/fetchRoomTitle", { roomID: roomID })
			.then((res) => {
				setRoomTitle(res.data);
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
				<ShareBtn>
					<ShareIcon>
						<Share />
					</ShareIcon>
					<ShareText>Share</ShareText>
				</ShareBtn>
				<NavBtnLink>
					<Export />
				</NavBtnLink>
				<NavBtnLink>
					<People />
				</NavBtnLink>
				<NavBtnLink>
					<Settings />
				</NavBtnLink>
			</NavMenu>
		</>
	);
}
