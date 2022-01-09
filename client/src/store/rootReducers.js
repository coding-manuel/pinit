import { combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice";
import userReducer from "./slices/userSlice";
import linkReducer from "./slices/linkSlice";

const rootReducer = combineReducers({
	note: noteReducer,
	link: linkReducer,
	user: userReducer,
});
export default rootReducer;
