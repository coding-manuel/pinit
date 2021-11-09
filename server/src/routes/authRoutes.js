const express = require("express");
const router = express.Router();
const passport = require("passport");
const { verifyUser } = require("../authenticate");
const {
	login,
	register,
	user,
	refreshToken,
	logout,
	getUsername,
} = require("../controller/authController");

router.post("/login", passport.authenticate("local"), login);
router.post("/register", register);
router.post("/getUsername", getUsername);
router.post("/refreshToken", refreshToken);
router.get("/user", verifyUser, user);
router.get("/logout", verifyUser, logout);

module.exports = router;
