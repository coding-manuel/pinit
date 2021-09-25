import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_NOTESET, SELECT_NOTE } from "../../store/slices/noteSlice";
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

export default function App() {
	const dispatch = useDispatch();
	const { noteSet, selectedNote, draggedNote } = useSelector(
		(state) => state.reducer.note
	);

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
			{noteSet.map((rect) => {
				return (
					<Note
						shapeProps={rect}
						text={rect.text}
						isSelected={selectedNote.includes(rect.id)}
						draggedNote={draggedNote.includes(rect.id)}
					/>
				);
			})}
		</Stage>
	);
}
