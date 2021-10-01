const express = require("express");
const router = express.Router();
const { getNotes } = require("../controller/notesController");

router.get("/fetchAll", getNotes);

module.exports = router;
