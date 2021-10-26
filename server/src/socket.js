const connectSocket = async (http) => {
	const io = require("socket.io")(http, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	const Note = require("./models/noteSchema");
	const Room = require("./models/roomSchema");

	io.on("connection", function (socket) {
		socket.on("get-board", async (roomID, ownerID) => {
			const notes = await Note.find({ roomID: roomID }).exec();
			await Room.findOneAndUpdate(
				{ roomID: roomID },
				{ roomID: roomID, owner: ownerID },
				{ upsert: true, setDefaultsOnInsert: true }
			);
			socket.join(roomID);
			socket.emit("load-notes", notes);

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

			socket.on("setUserName", async (x) => {
				console.log(x);
				users.push(x);
				socket.to(roomID).emit("recieveUserNames", users);
			});

			socket.on("setUser", async (username) => {
				console.log("dskjfglkd");
			});
		});
	});

	//Whenever someone disconnects this piece of code executed
	io.on("disconnect", function () {
		console.log("A user disconnected");
	});
};

module.exports = connectSocket;
