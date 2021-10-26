const express = require("express");
const router = express.Router();
const {
	getRooms,
	getRoomTitle,
	changeRoomTitle,
	deleteRoom,
} = require("../controller/roomController.js");

router.post("/fetchRoomByID", getRooms);
router.post("/fetchRoomTitle", getRoomTitle);
router.post("/deleteRoom", deleteRoom);
router.post("/changeRoomTitle", changeRoomTitle);

module.exports = router;
