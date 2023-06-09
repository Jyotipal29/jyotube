const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const { toggleLike } = require("../controller/likeController");

router.post("/toggel/:id", protect, toggleLike);

module.exports = router;
