import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	UPDATE_NOTESET,
	SELECT_NOTE,
	fetchNoteSet,
} from "../../store/slices/noteSlice";
import styled from "styled-components";
import Note from "./Note.jsx";

const Stage = styled.div`
	background: ${(props) => props.theme.color.dark[0]};
	height: ${window.innerHeight - 40}px;
	width: 100vw;
`;

const Grid = styled.div`
	height: 100vh;
	width: 100vw;
	background-image: url("../../assets/icons/dot grid.png");
	background-repeat: repeat-y;
`;

export default function Canvas() {
	const dispatch = useDispatch();
	const { noteSet, selectedNote, draggedNote } = useSelector(
		(state) => state.reducer.note
	);

	React.useEffect(() => {
		dispatch(fetchNoteSet());
		return () => {
			//
		};
	}, [dispatch]);

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
			{/* <Grid></Grid> */}
			{noteSet.map((note) => {
				return (
					<Note
						shapeProps={note}
						isSelected={selectedNote.includes(note.id)}
						draggedNote={draggedNote.includes(note.id)}
					/>
				);
			})}
		</Stage>
	);
}
