const jwt = require("jsonwebtoken");
const {
	getToken,
	COOKIE_OPTIONS,
	getRefreshToken,
} = require("../authenticate");
const User = require("../models/userSchema");

const login = (req, res, next) => {
	try {
		const token = getToken({ _id: req.user._id });
		const refreshToken = getRefreshToken({ _id: req.user._id });
		User.findById(req.user._id).then(
			(user) => {
				user.refreshToken.push({ refreshToken });
				user.save((err, user) => {
					if (err) {
						res.statusCode = 500;
						res.send(err);
					} else {
						res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
						res.send({ success: true, token });
					}
				});
			},
			(err) => next(err)
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const register = (req, res, next) => {
	try {
		User.register(
			new User({ username: req.body.username }),
			req.body.password,
			(err, user) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					user.name = req.body.name;
					user.email = req.body.email;
					user.userID = "id" + Math.random().toString(16).slice(2);
					const token = getToken({ _id: user._id });
					const refreshToken = getRefreshToken({ _id: user._id });
					user.refreshToken.push({ refreshToken });
					user.save((err, user) => {
						if (err) {
							res.statusCode = 500;
							res.send(err);
						} else {
							res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
							res.send({ success: true, token });
						}
					});
				}
			}
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const user = (req, res, next) => {
	try {
		res.send(req.user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const logout = (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	User.findById(req.user._id).then(
		(user) => {
			const tokenIndex = user.refreshToken.findIndex(
				(item) => item.refreshToken === refreshToken
			);

			if (tokenIndex !== -1) {
				user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
			}

			user.save((err, user) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					res.clearCookie("refreshToken", COOKIE_OPTIONS);
					res.send({ success: true });
				}
			});
		},
		(err) => next(err)
	);
};

const refreshToken = (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	if (refreshToken) {
		try {
			const payload = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
			const userId = payload._id;
			User.findOne({ _id: userId }).then(
				(user) => {
					if (user) {
						// Find the refresh token against the user record in database
						const tokenIndex = user.refreshToken.findIndex(
							(item) => item.refreshToken === refreshToken
						);

						if (tokenIndex === -1) {
							res.statusCode = 401;
							res.send("Unauthorized 4");
						} else {
							const token = getToken({ _id: userId });
							// If the refresh token exists, then create new one and replace it.
							const newRefreshToken = getRefreshToken({ _id: userId });
							user.refreshToken[tokenIndex] = {
								refreshToken: newRefreshToken,
							};
							user.save((err, user) => {
								if (err) {
									res.statusCode = 500;
									res.send(err);
								} else {
									res.cookie(
										"refreshToken",
										newRefreshToken,
										COOKIE_OPTIONS
									);
									res.send({ success: true, token });
								}
							});
						}
					} else {
						res.statusCode = 401;
						res.send("Unauthorized 3");
					}
				},
				(err) => next(err)
			);
		} catch (err) {
			res.statusCode = 401;
			res.send("Unauthorized 2");
		}
	} else {
		res.statusCode = 401;
		res.send("Unauthorized 1");
	}
};

module.exports = {
	login,
	register,
	user,
	refreshToken,
	logout,
};
