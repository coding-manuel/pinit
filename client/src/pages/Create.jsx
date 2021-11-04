import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "../services/api";
import { io } from "../services/socket";
import Topbar from "../components/Navbar/toptitle.topbar.jsx";
import Sidebar from "../components/Sidebar/sidebar.jsx";
import Canvas from "../components/Canvas/Canvas.jsx";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_NOTES } from "../store/slices/noteSlice.js";
import {
	SET_USERS_LIST,
	SET_USERID,
	SET_ROLE,
} from "../store/slices/userSlice.js";
import styled from "styled-components";

const MainBoard = styled.div`
	max-height: 100vh;
`;

function Create() {
	const dispatch = useDispatch();
	const userRole = useSelector((state) => state.reducer.user.role);
	const history = useHistory();

	// const [userList, setUserList] = React.useState([]);
	const query = new URLSearchParams(useLocation().search);

	const roomID = query.get("roomID") || location.state.roomID;
	const role = "" || query.get("role");

	let userID = "";
	let username = "";

	useEffect(() => {
		axios()
			.get("/auth/user", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("user"),
				},
			})
			.then((resp) => {
				userID = resp.data.userID;
				username = resp.data.username;

				dispatch(SET_USERID(userID));

				if (io == null) return;

				io.once("load-notes", (notes) => {
					dispatch(LOAD_NOTES(notes));
				});

				io.emit("get-board", roomID, userID, username);

				io.emit("get-users", {
					roomID: roomID,
					userID: userID,
					username: username,
					role: role,
				});
			});
	}, []);

	useEffect(() => {
		if (io == null) return;
		io.on("set-users", (users) => {
			dispatch(SET_USERS_LIST(users));
			dispatch(SET_ROLE(users.find((user) => user.userID === userID)));
		});
	}, []);

	useEffect(() => {
		if (io == null) return;
		io.on("disconnect", (users) => {
			dispatch(SET_USERS_LIST(users));
		});
	}, []);

	return (
		<MainBoard>
			<Topbar create={true} />
			<Canvas />
			{userRole !== "view" && <Sidebar />}
		</MainBoard>
	);
}

export default Create;
