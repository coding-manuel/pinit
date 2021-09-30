const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => console.log("Database Conected"))
		.catch((err) => console.log(err));
};

module.exports = connectDB;
