import React, { useEffect, useState } from "react";
import Topbar from "../components/Navbar/toptitle.topbar.jsx";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { SET_USERID } from "../store/slices/userSlice.js";
import axios from "../services/api";
import Trash from "../assets/icons/trash.svg";
import Add from "../assets/icons/add.svg";

const DashboardContent = styled.div`
	background: ${(props) => props.theme.color.dark[0]};
	min-height: 100vh;
`;
const Container = styled.div`
	padding: 20px 40px;
`;

const Segment = styled.div`
	margin: 0 0 4rem 0;
`;

const Note = styled.div`
	width: 250px;
	height: 300px;
	background-color: ${(props) => props.theme.color.dark[1]};
	transition: all 0.2s ease-out;
	display: flex;
	flex-direction: column;
	margin: 0 30px 40px 0;
	align-items: flex-end;

	&:hover {
		box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
			0px 20px 31px 3px rgba(0, 0, 0, 0.14),
			0px 8px 38px 7px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}
`;

const NoteFoot = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	z-index: 10;
`;

const NoteHead = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const Notes = styled.div`
	margin: 20px 0;
	display: flex;
	flex-wrap: wrap;
`;

const TrashIcon = styled.div`
	padding: 5px;
	margin: 5px;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.color.dark[2]};
	}
	& svg {
		transform: translateY(3px);
	}
`;

const AddIcon = styled.div`
	transform: scale(1.8);
	padding: 10px;
`;

const NewNote = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${(props) => props.theme.color.primary};
	padding: 20px 40px;
	margin: 20px 0;
	cursor: pointer;
	width: 100px;
	border-radius: 5px;
	transition: all 0.2s ease-out;
	&:hover {
		box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
			0px 20px 31px 3px rgba(0, 0, 0, 0.14),
			0px 8px 38px 7px rgba(0, 0, 0, 0.12);
		background-color: ${(props) => props.theme.color.primaryDarken};
		transform: translateY(-2px);
	}
`;

const Title = styled.h3`
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

const SubTitle = styled.h4`
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
`;

const NoteTitle = styled.h4`
	font-weight: ${(props) => props.theme.typography.regular};
	color: ${(props) => props.theme.color.white};
	padding: 10px;
	flex-grow: 2;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const NewNoteText = styled.h4`
	font-weight: ${(props) => props.theme.typography.semibold};
	color: ${(props) => props.theme.color.white};
	margin: 0;
`;

const Loader = styled.div`
	border: 5px solid #f3f3f3; /* Light grey */
	border-top: 5px solid ${(props) => props.theme.color.primary}; /* Blue */
	border-radius: 50%;
	width: 20px;
	height: 20px;
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

export default function Dashboard() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [rooms, setRooms] = useState([]);
	const [sharedRooms, setSharedRooms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const CreateNewNote = () => {
		const roomID = uuidV4();
		history.push({
			pathname: "/note/create",
			search: `?roomID=${roomID}`,
			state: { roomID: roomID },
		});
	};

	const openNote = (room) => {
		const roomID = room;
		history.push({
			pathname: "/note/create",
			search: `?roomID=${roomID}`,
			state: { roomID: roomID },
		});
	};

	const deleteRoom = (roomid) => {
		const roomID = roomid;
		axios().post("/rooms/deleteRoom", { roomID: roomID });
		const newRooms = rooms.filter((room) => room.roomID !== roomid);
		setRooms(newRooms);
	};

	useEffect(() => {
		setIsLoading(true);
		axios()
			.get("/auth/user", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("user"),
				},
			})
			.then(
				(resp) => {
					dispatch(SET_USERID(resp.data.userID));
					axios()
						.post("/rooms/fetchRoomByID", { userID: resp.data.userID })
						.then(
							(res) => {
								setRooms([...res.data]);
							},
							(err) => console.log(err)
						);
					axios()
						.post("/rooms/fetchSharedRoomByID", {
							userID: resp.data.userID,
						})
						.then(
							(res) => {
								setSharedRooms([...res.data]);
								setIsLoading(false);
							},
							(err) => console.log(err)
						);
				},
				(err) => {
					setError(error);
				}
			);
	}, []);

	return (
		<DashboardContent>
			<Topbar create={false} />
			<Container>
				<Segment>
					<Title>Create a Note</Title>
					<NewNote onClick={CreateNewNote}>
						<AddIcon>
							<Add />
						</AddIcon>
						<NewNoteText>New Note</NewNoteText>
					</NewNote>
				</Segment>
				<Segment>
					<Title>All Notes</Title>
					<Notes>
						{rooms.length !== 0 ? (
							rooms.map((room) => {
								return (
									<Note key={room._id}>
										<NoteHead
											onClick={() => openNote(room.roomID)}
										></NoteHead>
										<NoteFoot>
											<NoteTitle>{room.title}</NoteTitle>
											<TrashIcon
												onClick={() => deleteRoom(room.roomID)}
											>
												<Trash />
											</TrashIcon>
										</NoteFoot>
									</Note>
								);
							})
						) : !isLoading ? (
							<SubTitle>Oops, No Saved Notes</SubTitle>
						) : (
							<Loader></Loader>
						)}
					</Notes>
				</Segment>
				<Segment>
					<Title>Shared Notes</Title>
					<Notes>
						{sharedRooms.length !== 0 ? (
							sharedRooms.map((room) => {
								return (
									<Note key={room._id}>
										<NoteHead
											onClick={() => openNote(room.roomID)}
										></NoteHead>
										<NoteFoot>
											<NoteTitle>{room.title}</NoteTitle>
										</NoteFoot>
									</Note>
								);
							})
						) : !isLoading ? (
							<SubTitle>Oops, No Shared Notes</SubTitle>
						) : (
							<Loader></Loader>
						)}
					</Notes>
				</Segment>
			</Container>
		</DashboardContent>
	);
}
