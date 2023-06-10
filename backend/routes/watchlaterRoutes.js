const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const { toggleWatchlater } = require("../controller/watchlaterController");

router.post("/toggel/:id", protect, toggleWatchlater);

module.exports = router;
