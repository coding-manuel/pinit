const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	roomID: String,
	owner: String,
	users: Array,
	shareLinks: {
		edit: String,
		view: String,
	},
	title: { type: String, default: "Untitled" },
});

const room = mongoose.model("Room", roomSchema);

module.exports = room;
