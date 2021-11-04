const Room = require("../models/roomSchema");
const Note = require("../models/noteSchema");

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
	let result = " ";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

const getRooms = async (req, res) => {
	try {
		const rooms = await Room.find({ owner: req.body.userID });
		res.send(rooms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getSharedRooms = async (req, res) => {
	try {
		const rooms = await Room.find({
			"users.userID": req.body.userID,
			owner: { $ne: req.body.userID },
		});
		res.send(rooms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getRoomTitle = async (req, res) => {
	try {
		const room = await Room.findOne({ roomID: req.body.roomID });
		res.send(room.title);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getRoomInfo = async (req, res) => {
	try {
		const room = await Room.find({ roomID: req.body.roomID });
		res.json(room[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const deleteRoom = async (req, res) => {
	try {
		await Note.deleteMany({ roomID: req.body.roomID });
		await Room.findOneAndRemove({ roomID: req.body.roomID });
		res.status(200).json({ message: "Deleted Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const changeRoomTitle = async (req, res) => {
	try {
		await Room.findOneAndUpdate(
			{ roomID: req.body.roomID },
			{ title: req.body.title }
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const changeShareLink = async (req, res) => {
	try {
		const NewShareLink = generateString(8);
		if (req.body.role === "Edit")
			await Room.findOneAndUpdate({
				roomID: req.body.roomID,
				shareLinks: {
					edit: NewShareLink,
				},
			});
		else
			await Room.findOneAndUpdate({
				roomID: req.body.roomID,
				shareLinks: {
					view: NewShareLink,
				},
			});
		res.status(200).send("Changed the Link Successfully");
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getRole = async (req, res) => {};

module.exports = {
	getRooms,
	getRoomTitle,
	getRoomInfo,
	changeRoomTitle,
	deleteRoom,
	getRole,
	changeShareLink,
	getSharedRooms,
};
