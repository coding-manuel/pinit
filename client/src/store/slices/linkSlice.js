import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { io } from "../../services/socket";

const initialState = {
    linkSet: [],
    selectedLink: [],
    draggedLink: [],
    loading: "idle",
    error: "",
};

const linkSlice = createSlice({
    name: "link",
    initialState: initialState,
    reducers: {
        CREATE_LINK(state, { payload }) {
            const newLink = {
                id: uuidV4(),
                roomID: payload,
                x: 20,
                y: 50,
                width: 300,
                height: 60,
                content: '[{"children":[{"normaltext":true, "text":""}]}]',
            };
            io.emit("linkCreate", newLink);
            state.linkSet.push(newLink);
            console.log("link")
        },
        DELETE_LINK(state, { payload }) {
            const index = state.linkSet.findIndex(
                (link) => link.id === payload.id
            );
            io.emit("linkDelete", state.linkSet[index]);
            state.linkSet.splice(index, 1);
        },
        REMOVE_LINK(state, { payload }) {
            state.linkSet = state.linkSet.filter((link) => link.id !== payload.id);
        },
        UPDATE_LINKSET(state, { payload }) {
            const index = state.linkSet.findIndex(
                (link) => link.id === payload.id
            );
            state.linkSet[index] = payload;
        },
        SELECT_LINK(state, { payload }) {
            state.selectedLink = payload;
        },
        DRAG_LINK(state, { payload }) {
            state.draggedLink = payload;
        },
        LOAD_LINKS(state, { payload }) {
            state.linkSet = payload;
        },
        ADD_LINK(state, { payload }) {
            state.linkSet.push(payload);
        },
        FORMAT_LINK_CONTENT(state, { payload }) { },
    },
});

const { actions, reducer } = linkSlice;

export const {
    UPDATE_NOTESET,
    DRAG_NOTE,
    SELECT_NOTE,
    CREATE_LINK,
    FORMAT_NOTE_CONTENT,
    LOAD_NOTES,
    ADD_NOTE,
    DELETE_NOTE,
    REMOVE_NOTE,
} = actions;

export default reducer;
