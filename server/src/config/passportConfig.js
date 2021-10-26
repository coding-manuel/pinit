const localStrategy = require("passport-local");
const User = require("../models/userSchema");

module.exports = function (passport) {
	//Called during login/sign up.
	passport.use(new localStrategy(User.authenticate()));

	//called while after logging in / signing up to set user details in req.user
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
	// passport.use(
	// 	new localStrategy((username, password, done) => {
	// 		User.findOne({ username: username }, (err, user) => {
	// 			if (err) throw err;
	// 			if (!user) return done(null, false);
	// 			bcrypt.compare(password, user.password, (err, result) => {
	// 				{
	// 					if (err) throw err;
	// 					if (result === true) {
	// 						return done(null, user);
	// 					} else {
	// 						return done(null, false);
	// 					}
	// 				}
	// 			});
	// 		});
	// 	})
	// );

	// passport.serializeUser((user, done) => {
	// 	{
	// 		done(null, user.id);
	// 	}
	// });

	// passport.deserializeUser((id, done) => {
	// 	User.findOne({ _id: id }, (err, user) => {
	// 		const UserInformation = {
	// 			username: user.username,
	// 		};
	// 		done(err, user);
	// 	});
	// });
};
