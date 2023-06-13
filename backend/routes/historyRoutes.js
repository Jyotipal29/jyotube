const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const {
  addHistory,
  getHistory,
  clearHistory,
} = require("../controller/historyController");

router.post("/:id", protect, addHistory);
router.get("/", protect, getHistory);
router.delete("/", protect, clearHistory);

module.exports = router;
