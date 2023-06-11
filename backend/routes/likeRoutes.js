const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const { toggleLike, getLikedVideos } = require("../controller/likeController");

router.post("/toggel/:id", protect, toggleLike);
router.get("/", protect, getLikedVideos);

module.exports = router;
