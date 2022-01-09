import React, { useEffect, useState } from "react";
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

const LoaderScreen = styled.div`
	min-height: 100vh;
	background: ${(props) => props.theme.color.dark[0]};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoaderAnimation = styled.div`
	border: 5px solid #f3f3f3; /* Light grey */
	border-top: 5px solid ${(props) => props.theme.color.primary}; /* Blue */
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

function Demo() {
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.reducer.user.role);
    const history = useHistory();

    // const [userList, setUserList] = React.useState([]);
    const query = new URLSearchParams(useLocation().search);


    return (
        <MainBoard>
            <Topbar create={true} />
            <Canvas />
            <Sidebar />
        </MainBoard>
    )
}

export default Demo;
