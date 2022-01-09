import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	UPDATE_NOTESET,
	SELECT_NOTE,
	// fetchNoteSet,
} from "../../store/slices/noteSlice";
import styled from "styled-components";
import Note from "./Note.jsx";
import Link from "./Link.jsx"

const Stage = styled.div`
	background: ${(props) => props.theme.color.dark[0]};
	height: ${window.innerHeight - 40}px;
	width: 100vw;
	pointer-events: ${(props) => props.userRole === "viewer" && "none"};
`;

const Grid = styled.div`
	height: 100%;
	width: 100%;
	background-image: url("../../assets/icons/dotgrid.png");
	background-repeat: repeat-y;
	position: absolute;
	z-index: 1000;
`;

export default function Canvas() {
	const dispatch = useDispatch();
	const { noteSet, selectedNote, draggedNote } = useSelector(
		(state) => state.reducer.note
	);
	const { linkSet, selectedLink, draggedLink } = useSelector(
		(state) => state.reducer.link
	);
	const userRole = useSelector((state) => state.reducer.user.role);

	const [userList, setUserList] = React.useState([]);
	const checkDeselect = (e) => {
		if (e.target.id === "stage") {
			dispatch(SELECT_NOTE([]));
		}
	};

	return (
		<Stage
			id="stage"
			onMouseDown={checkDeselect}
			onTouchStart={checkDeselect}
		>
			{userRole === "viewer" && <Grid></Grid>}
			{noteSet.map((note) => {
				return (
					<Note
						shapeProps={note}
						key={note.id}
						isSelected={selectedNote.includes(note.id)}
						draggedNote={draggedNote.includes(note.id)}
					/>
				);
			})}
			{linkSet.map((note) => {
				return (
					<Link
						shapeProps={note}
						key={note.id}
						isSelected={selectedNote.includes(note.id)}
						draggedNote={draggedNote.includes(note.id)}
					/>
				);
			})}
		</Stage>
	);
}
