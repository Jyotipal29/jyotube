const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const { addHistory, getHistory } = require("../controller/historyController");

router.post("/:id", protect, addHistory);
router.get("/", protect, getHistory);

module.exports = router;
