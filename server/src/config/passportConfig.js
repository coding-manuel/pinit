const localStrategy = require("passport-local");
const User = require("../models/userSchema");

module.exports = function (passport) {
	//Called during login/sign up.
	passport.use(new localStrategy(User.authenticate()));

	//called while after logging in / signing up to set user details in req.user
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};
