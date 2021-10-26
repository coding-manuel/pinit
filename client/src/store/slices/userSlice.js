import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: "",
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		SET_USERID(state, { payload }) {
			state.userID = payload;
		},
	},
});

const { actions, reducer } = userSlice;

export const { SET_USERID } = actions;

export default reducer;
