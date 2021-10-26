import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../services/api";
import { io } from "../services/socket";
import Topbar from "../components/Navbar/toptitle.topbar.jsx";
import Sidebar from "../components/Sidebar/sidebar.jsx";
import Canvas from "../components/Canvas/Canvas.jsx";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_NOTES } from "../store/slices/noteSlice.js";
import styled from "styled-components";

const MainBoard = styled.div`
	max-height: 100vh;
`;

function Create() {
	const dispatch = useDispatch();
	const location = useLocation();

	// const [userList, setUserList] = React.useState([]);
	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}

	let query = useQuery();
	useEffect(() => {
		if (io == null) return;

		const roomID = query.get("roomID") || location.state.roomID;
		let userID = "";

		axios()
			.get("/auth/user", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("user"),
				},
			})
			.then((resp) => {
				userID = resp.data.userID;

				io.once("load-notes", (notes) => {
					dispatch(LOAD_NOTES(notes));
				});

				io.emit("get-board", roomID, userID);
			});
	}, []);

	// React.useEffect(() => {
	// 	if (io == null) return;

	// 	io.on("recieveUserNames", (userList) => {
	// 		setUserList(userList);
	// 	});

	// 	//const username = prompt("Enter username", "");
	// 	io.emit("setUserName", "username");
	// }, [io]);

	return (
		<MainBoard>
			<Topbar create={true} />
			<Canvas />
			<Sidebar />
			{/* <div>
				{userList.map((user) => {
					<h1>{user}</h1>;
				})}
			</div> */}
		</MainBoard>
	);
}

export default Create;
