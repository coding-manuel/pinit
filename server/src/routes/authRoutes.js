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
} = require("../controller/authController");

router.post("/login", passport.authenticate("local"), login);
router.post("/register", register);
router.get("/user", verifyUser, user);
router.get("/logout", verifyUser, logout);
router.post("/refreshToken", refreshToken);

module.exports = router;
