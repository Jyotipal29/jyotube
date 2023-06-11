const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const {
  toggleWatchlater,
  getWatchlaterVideos,
} = require("../controller/watchlaterController");

router.post("/toggel/:id", protect, toggleWatchlater);
router.get("/", protect, getWatchlaterVideos);

module.exports = router;
