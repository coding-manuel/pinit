const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const notesRoutes = require("./routes/notesRoutes");
require("dotenv").config();

const middlewares = require("./middlewares");

const PORT = process.env.PORT || 8080;
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use("/api/notes", notesRoutes);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
