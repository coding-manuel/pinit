import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../../services/api";

export const fetchNoteSet = createAsyncThunk("note/fetchNoteSet", async () => {
	try {
		let response = await APIService().get("/notes/fetchAll");
		return await response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

const initialState = {
	noteSet: [],
	selectedNote: [],
	draggedNote: [],
	loading: "idle",
	error: "",
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
	extraReducers: (builder) => {
		builder.addCase(fetchNoteSet.pending, (state) => {
			state.noteSet = [];
			state.loading = "loading";
		});
		builder.addCase(fetchNoteSet.fulfilled, (state, { payload }) => {
			state.noteSet = payload;
			state.loading = "loaded";
		});
		builder.addCase(fetchNoteSet.rejected, (state, action) => {
			state.loading = "error";
			state.error = action.error.message;
		});
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
