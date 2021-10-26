import { combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
	note: noteReducer,
	user: userReducer,
});
export default rootReducer;
