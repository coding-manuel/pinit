import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	noteSet: [
		{
			id: "rect1",
			x: 20,
			y: 50,
			width: 300,
			height: 60,
			fill: "#606060",
			text: "",
		},
		{
			id: "rect2",
			x: 150,
			y: 150,
			width: 300,
			height: 60,
			fill: "#606060",
			text: "Chicken is great",
		},
		{
			id: "rect3",
			x: 200,
			y: 150,
			width: 300,
			height: 60,
			fill: "#606060",
			text: "Chicken is great",
		},
		{
			id: "rect4",
			x: 300,
			y: 150,
			width: 300,
			height: 60,
			fill: "#606060",
			text: "Chicken is great",
		},
	],
	selectedNote: [],
	draggedNote: [],
};

const noteSlice = createSlice({
	name: "note",
	initialState: initialState,
	reducers: {
		CREATE_NOTE(state, { payload }) {
			state.noteSet.push({
				id: "chicken",
				x: payload.x,
				y: payload.y,
				width: 300,
				height: 60,
				fill: "#606060",
				text: "",
			});
		},
		UPDATE_NOTESET(state, { payload }) {
			const index = state.noteSet.findIndex(
				(note) => note.id === payload.id
			);
			state.noteSet[index] = payload;
		},
		SELECT_NOTE(state, { payload }) {
			state.selectedNote = payload;
		},
		DRAG_NOTE(state, { payload }) {
			state.draggedNote = payload;
		},
		FORMAT_NOTE_CONTENT(state, { payload }) {},
	},
});

const { actions, reducer } = noteSlice;

export const {
	UPDATE_NOTESET,
	DRAG_NOTE,
	SELECT_NOTE,
	CREATE_NOTE,
	FORMAT_NOTE_CONTENT,
} = actions;

export default reducer;
