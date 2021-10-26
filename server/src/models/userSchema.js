const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new mongoose.Schema({
	refreshToken: {
		type: String,
		default: "",
	},
});

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		default: "",
	},
	userID: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		default: "",
	},
	username: {
		type: String,
		default: "",
	},
	authStrategy: {
		type: String,
		default: "local",
	},
	points: {
		type: Number,
		default: 50,
	},
	refreshToken: {
		type: [Session],
	},
});

//Remove refreshToken from the response
userSchema.set("toJSON", {
	transform: function (doc, ret, options) {
		delete ret.refreshToken;
		return ret;
	},
});

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model("User", userSchema);

module.exports = user;
