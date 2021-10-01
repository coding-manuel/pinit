require("dotenv").config();

const connectDB = require("./config/db");
const notes = require("./data/notes");
const note = require("./models/note");

connectDB();

const importData = async () => {
	try {
		await note.deleteMany({});

		await note.insertMany(notes);

		console.log("Import Success");

		process.exit();
	} catch (error) {
		console.log("Import Failed");

		process.exit(1);
	}
};

importData();
