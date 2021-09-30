const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	id: String,
	x: Number,
	y: Number,
	width: Number,
	height: Number,
	content: String,
});

const note = mongoose.model("note", noteSchema);

module.exports = note;
