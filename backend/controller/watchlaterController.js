const express = require("express");
const router = express.Router();
const Video = require("./videoModel");
const Watchlater = require("./watchlaterModel");

const toggleWatchlater = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Find the watchlater entry associated with the user and the video
    const watchlater = await Watchlater.findOne({
      user: req.user,
      video: id,
    });

    if (watchlater) {
      // If the video is already saved for later, remove it from watch later
      await Watchlater.findByIdAndRemove(watchlater._id);
      video.watchlater.pull(watchlater._id);
      await video.save();
      return res.json({ message: "Video removed from watch later" });
    } else {
      // If the video is not saved for later, create a new watchlater entry
      const newWatchlater = new Watchlater({
        user: req.user,
        video: id,
      });
      await newWatchlater.save();
      video.watchlater.push(newWatchlater);
      await video.save();
      return res.json({ message: "Video saved to watch later", video });
    }
  } catch (error) {
    console.error("Error toggling watch later status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  toggleWatchlater,
};
