const Room = require("../models/roomSchema");

const getRooms = async (req, res) => {
	try {
		const rooms = await Room.find({ owner: req.body.userID });
		console.log(rooms);
		res.json(rooms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getRoomTitle = async (req, res) => {
	try {
		const room = await Room.find({ roomID: req.body.roomID });
		res.json(room[0].title);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const deleteRoom = async (req, res) => {
	try {
		const room = await Room.findOneAndRemove({ roomID: req.body.roomID });
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

module.exports = {
	getRooms,
	getRoomTitle,
	changeRoomTitle,
	deleteRoom,
};
