import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../../services/api";
import { v4 as uuidV4 } from "uuid";
import { io } from "../../services/socket";

// export const fetchNoteSet = createAsyncThunk("note/fetchNoteSet", async () => {
// 	try {
// 		let response = await APIService().get("/notes/fetchAll");
// 		return await response.data;
// 	} catch (error) {
// 		return thunkAPI.rejectWithValue({ error: error.message });
// 	}
// });

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
			const newNote = {
				id: uuidV4(),
				roomID: payload,
				x: 20,
				y: 50,
				width: 300,
				height: 60,
				content: '[{"children":[{"normaltext":true, "text":""}]}]',
			};
			io.emit("noteCreate", newNote);
			state.noteSet.push(newNote);
		},
		DELETE_NOTE(state, { payload }) {
			const index = state.noteSet.findIndex(
				(note) => note.id === payload.id
			);
			io.emit("noteDelete", state.noteSet[index]);
			state.noteSet.splice(index, 1);
		},
		REMOVE_NOTE(state, { payload }) {
			state.noteSet = state.noteSet.filter((note) => note.id !== payload.id);
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
		LOAD_NOTES(state, { payload }) {
			state.noteSet = payload;
		},
		ADD_NOTE(state, { payload }) {
			state.noteSet.push(payload);
		},
		FORMAT_NOTE_CONTENT(state, { payload }) {},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(fetchNoteSet.pending, (state) => {
	// 		state.noteSet = [];
	// 		state.loading = "loading";
	// 	});
	// 	builder.addCase(fetchNoteSet.fulfilled, (state, { payload }) => {
	// 		state.noteSet = payload;
	// 		state.loading = "loaded";
	// 	});
	// 	builder.addCase(fetchNoteSet.rejected, (state, action) => {
	// 		state.loading = "error";
	// 		state.error = action.error.message;
	// 	});
	// },
});

const { actions, reducer } = noteSlice;

export const {
	UPDATE_NOTESET,
	DRAG_NOTE,
	SELECT_NOTE,
	CREATE_NOTE,
	FORMAT_NOTE_CONTENT,
	LOAD_NOTES,
	ADD_NOTE,
	DELETE_NOTE,
	REMOVE_NOTE,
} = actions;

export default reducer;
