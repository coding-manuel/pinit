import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: "",
	usersList: [],
	role: "",
	boardTitle: "",
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		SET_USERID(state, { payload }) {
			state.userID = payload;
		},
		SET_ROLE(state, { payload }) {
			state.role = payload.role;
		},
		SET_USERS_LIST(state, { payload }) {
			state.usersList = payload;
		},
		SET_BOARD_TITLE(state, { payload }) {
			state.boardTitle = payload;
		},
	},
});

const { actions, reducer } = userSlice;

export const { SET_USERID, SET_ROLE, SET_USERS_LIST, SET_BOARD_TITLE } =
	actions;

export default reducer;
