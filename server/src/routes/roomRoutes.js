const express = require("express");
const router = express.Router();
const {
	getRooms,
	getRoomTitle,
	changeRoomTitle,
	deleteRoom,
	getRoomInfo,
	getRole,
	changeShareLink,
	getSharedRooms,
} = require("../controller/roomController.js");

router.post("/fetchRoomByID", getRooms);
router.post("/fetchSharedRoomByID", getSharedRooms);
router.post("/fetchRoomTitle", getRoomTitle);
router.post("/fetchRoomInfo", getRoomInfo);
router.post("/fetchRole", getRole);

router.post("/deleteRoom", deleteRoom);

router.post("/changeRoomTitle", changeRoomTitle);
router.post("/changeRoomShareLinks", changeShareLink);

module.exports = router;
