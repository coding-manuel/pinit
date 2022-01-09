import React, { useEffect } from "react";
import styled from "styled-components";
import Note from "../../assets/icons/note.svg";
import Whiteboard from "../../assets/icons/whiteboard.svg";
import Link from "../../assets/icons/link.svg";
import Table from "../../assets/icons/table.svg";
import File from "../../assets/icons/file.svg";
import Image from "../../assets/icons/image.svg";
import { useDispatch } from "react-redux";
import { CREATE_NOTE } from "../../store/slices/noteSlice";
import { CREATE_LINK } from "../../store/slices/linkSlice";
import { useLocation } from "react-router";

const Icon = styled.div`
	display: flex;
	padding: 10px 0px;
	transform: scale(0.8);
	// width:30px;
	justify-content: center;
	cursor: pointer;
	transition: transform 250ms;
	&:hover {
		transform: translateY(-5px) scale(0.8);
		opacity: 0.5;
	}
`;
// const WhiteBorad  = styled(Board)`
//   fill : skyblue;
// `
const Text = styled.h6`
	color: white;
	margin-top: -5px;
	padding-bottom: 5px;
	font-size: 10px;
	font-weight: ${(props) => props.theme.typography.semibold};
	text-align: center;
	text-decoration: none;
	&:hover {
		cursor: pointer;
	}
`;
const Container = styled.div`
	background: ${(props) => props.theme.color.dark[1]};
	width: 70px;
	min-width: fit-content;
	height: fit-content;
	margin: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin-left: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
	padding: 5px 0px;
`;

function Sidebar() {
	const dispatch = useDispatch();

	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}

	let query = useQuery();
	const roomID = query.get("roomID");

	const createNotes = () => {
		dispatch(CREATE_NOTE(roomID));
	};

	const createLinks = () => {
		dispatch(CREATE_LINK(roomID));
	};

	return (
		<Container>
			<Icon onClick={createNotes}>
				<Note />
			</Icon>
			<Text>Notes</Text>
			<Icon onClick={createLinks}>
				<Link />
			</Icon>
			<Text>Link</Text>
			<Icon>
				<Whiteboard />
			</Icon>
			<Text>Whiteboard</Text>
			<Icon>
				<Image />
			</Icon>
			<Text>Image</Text>
			<Icon>
				<File />
			</Icon>
			<Text>File</Text>
			<Icon>
				<Table />
			</Icon>
			<Text>Table</Text>
			{/* {arr.map((item) => <Icon src={item}/>)} */}
			{/* <Design
          img = {info[0].imgURL}
          text = {info[0].text}
        />
        <Design
          img = {info[1].imgURL}
          text = {info[1].text}
        />
        <Design
          img = {info[2].imgURL}
          text = {info[2].text}
        />
        <Design
          img = {info[3].imgURL}
          text = {info[3].text}
        />
        <Design
          img = {info[4].imgURL}
          text = {info[4].text}
        /> */}
		</Container>
	);
}

export default Sidebar;
