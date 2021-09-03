import React from "react";
import styled from "styled-components";
import Note from "../../assets/icons/note.svg";
import Whiteboard from "../../assets/icons/whiteboard.svg";
import Link from "../../assets/icons/link.svg";
import Table from "../../assets/icons/table.svg";
import File from "../../assets/icons/file.svg";
import Image from "../../assets/icons/image.svg";

// const Icon = styled.div`
//   background-color: #1f1b10;
//   position : relative;
//   top : 20vh;
//   padding: 10px;
//   left : 0;
// `
const Icon = styled.div`
	display: flex;
	padding: 10px 0px;
	// width:30px;
	justify-content: center;
	cursor: pointer;
	transition: transform 250ms;
	&:hover {
		transform: translateY(-5px);
		opacity: 0.5;
	}
`;
// const WhiteBorad  = styled(Board)`
//   fill : skyblue;
// `
const Text = styled.p`
	color: white;
	margin-top: -5px;
	padding-bottom: 5px;
	font-size: small;
	text-align: center;
	&:hover {
		cursor: pointer;
	}
`;
const Container = styled.div`
	background-color: #1f1b10;
	width: 6%;
	min-width: 70px;
	height: 70vh;
	overflow-y: auto;
	margin: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	border: solid black;
	margin-left: 20px;
	max-height: 500px;
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

function Sidebar() {
	return (
		<Container>
			<Icon>
				<Note />
			</Icon>
			<Text>Notes</Text>
			<Icon>
				<Whiteboard />
			</Icon>
			<Text>whiteboard</Text>
			<Icon>
				<Link />
			</Icon>
			<Text>link</Text>
			<Icon>
				<Image />
			</Icon>
			<Text>image</Text>
			<Icon>
				<File />
			</Icon>
			<Text>file</Text>
			<Icon>
				<Table />
			</Icon>
			<Text>table</Text>
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
