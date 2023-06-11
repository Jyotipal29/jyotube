const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const {
  createPlaylist,
  addToPlaylist,
} = require("../controller/playlistController");

router.post("/", protect, createPlaylist);
router.post("/id", protect, addToPlaylist);

module.exports = router;
