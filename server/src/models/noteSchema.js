const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	roomID: String,
	id: String,
	x: Number,
	y: Number,
	width: Number,
	height: Number,
	content: String,
});

const Note = mongoose.model("Note", noteSchema, "Notes");

module.exports = Note;
