const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");
const {
  createPlaylist,
  addToPlaylist,
  getPlaylists,
  deletePlaylist,
  removeVideoFromPlaylist,
} = require("../controller/playlistController");

router.post("/", protect, createPlaylist);
router.post("/:id", protect, addToPlaylist);
router.get("/", protect, getPlaylists);
router.delete("/:id", protect, deletePlaylist);
router.delete("/:playlistId/:videoId", protect, getPlaylists);

module.exports = router;
