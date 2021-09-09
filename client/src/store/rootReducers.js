import { combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice";

const rootReducer = combineReducers({
	note: noteReducer,
});
export default rootReducer;
