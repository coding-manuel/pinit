//* ----------------------------------------------------------------------- Imports

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const connectSocket = require("./socket");
const BASE_URL = require("./config/keys");
const notesRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");

//* ----------------------------------------------------------------------- Initialisations

require("dotenv").config();

const app = express();
const http = require("http").createServer(app);

connectSocket(http); //socket code
connectDB();

const PORT = process.env.PORT || 8080;

//* ----------------------------------------------------------------------- Middwares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("common"));
//app.use(helmet());

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			mongoOptions: {
				useUnifiedTopology: true,
			},
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
	})
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	cors({
		origin: BASE_URL,
		credentials: true,
	})
);
require("./config/JwtStrategy");
require("./authenticate");
require("./config/passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

//* ----------------------------------------------------------------------- Routes

app.use(express.static(path.join(__dirname, "../../client/build")));
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/rooms", roomRoutes);
app.get("*", function (req, res) {
	res.sendFile("index.html", {
		root: path.join(__dirname, "../../client/build/"),
	});
});

const middlewares = require("./middlewares");
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

http.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
});
