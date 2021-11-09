const connectSocket = async (http) => {
	const io = require("socket.io")(http, {
		cors: {
			origin: BASE_URL,
			credentials: true,
		},
	});

	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	function generateString(length) {
		let result = " ";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
		}

		return result;
	}

	const Note = require("./models/noteSchema");
	const Room = require("./models/roomSchema");

	io.on("connection", function (socket) {
		socket.on("get-users", async ({ roomID, userID, username, role }) => {
			const room = await Room.findOne({ roomID: roomID });
			if (room) {
				if (room.owner !== userID) {
					// check if owner
					if (room.shareLinks.edit.trim() === role) {
						// check if editor link
						if (
							!room.users.find((user) => {
								user.userID === userID && user.role === "edit";
							})
						) {
							room.users.push({
								userID: userID,
								username: username,
								role: "edit",
							});
							await Room.findOneAndUpdate(
								{ roomID: roomID },
								{ users: room.users }
							);
						}
					} else if (room.shareLinks.view.trim() === role) {
						// check if editor link
						if (
							!room.users.find((user) => {
								user.userID === userID && user.role === "view";
							})
						) {
							room.users.push({
								userID: userID,
								username: username,
								role: "view",
							});
							await Room.findOneAndUpdate(
								{ roomID: roomID },
								{ users: room.users }
							);
						}
					}
					io.emit("set-users", room.users);
				}
			}
		});

		socket.on("get-board", async (roomID, userID, username) => {
			const notes = await Note.find({ roomID: roomID });
			var room = await Room.findOne({ roomID: roomID });

			if (!room) {
				const ShareEditLink = generateString(8);
				const ShareViewLink = generateString(8);
				await Room.create({
					roomID: roomID,
					owner: userID,
					title: "Untitled",
					users: [
						{
							userID: userID,
							role: "owner",
							username: username,
						},
					],
					shareLinks: { edit: ShareEditLink, view: ShareViewLink },
				});
				room = await Room.findOne({ roomID: roomID }, function (err, docs) {
					socket.join(roomID);
					socket.emit("load-notes", notes);
					socket.emit("set-users", docs.users);
				});
			} else {
				socket.join(roomID);
				socket.emit("load-notes", notes);
				socket.emit("set-users", room.users);
			}

			socket.on("noteCreate", async (newNoteContent) => {
				await Note.findOneAndUpdate(
					{ id: newNoteContent.id },
					newNoteContent,
					{
						upsert: true,
					}
				);
				const newNote = await Note.findOne({
					id: newNoteContent.id,
				}).exec();
				socket.to(roomID).emit("recieveCreateNote", newNote);
			});

			socket.on("noteDrag", async (newNote) => {
				socket.to(roomID).emit("recieveNoteDrag", newNote);
			});

			socket.on("noteResize", async (newNote) => {
				await Note.findOneAndUpdate({ id: newNote.id }, newNote);
				socket.to(roomID).emit("recieveNoteResize", newNote);
			});

			socket.on("noteChangeValue", async (newNote) => {
				await Note.findOneAndUpdate({ id: newNote.id }, newNote);
				socket.to(roomID).emit("recieveNoteChangeValue", newNote);
			});

			socket.on("noteDragStop", async (newNote) => {
				await Note.findOneAndUpdate({ id: newNote.id }, newNote);
			});

			socket.on("noteDelete", async (deleteNote) => {
				await Note.findOneAndRemove({ id: deleteNote.id });
				socket.to(roomID).emit("recieveNoteDelete", deleteNote);
			});

			socket.on("disconnect", () => {
				room.users.map(async (user, index) => {
					if (user.userID === userID && user.role !== "owner") {
						room.users.splice(index, 1);
						await Room.findOneAndUpdate(
							{ roomID: roomID },
							{ users: room.users }
						);
					}
				});
				console.log("user disconnect");
				io.emit("set-users", room.users);
			});
		});
	});

	//Whenever someone disconnects this piece of code executed
};

module.exports = connectSocket;
