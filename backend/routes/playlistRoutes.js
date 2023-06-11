const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const {
  createPlaylist,
  addToPlaylist,
  getPlaylists,
} = require("../controller/playlistController");

router.post("/", protect, createPlaylist);
router.post("/:id", protect, addToPlaylist);
router.get("/", protect, getPlaylists);

module.exports = router;
