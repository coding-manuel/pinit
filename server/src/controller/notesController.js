const Note = require("../models/note");

const getNotes = async (req, res) => {
	try {
		const notes = await Note.find({});
		res.json(notes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

module.exports = {
	getNotes,
};
