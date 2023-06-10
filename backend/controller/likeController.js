const Video = require("../model/videoModel");
const Like = require("../model/likeModel");

// Route for toggling the like status of a video
const toggleLike = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Find the like associated with the user and the video
    const like = await Like.findOne({ user: req.user, video: id });

    if (like) {
      // If the user already liked the video, remove the like
      await Like.findByIdAndRemove(like._id);
      video.likes.pull(like._id);
      await video.save();
      //   await like.remove();
      return res.json({ message: "Video unliked successfully", video });
    } else {
      // If the user hasn't liked the video, create a new like
      const newLike = new Like({ user: req.user, video: id });
      await newLike.save();
      video.likes.push(newLike);
      await video.save();
      return res.json({ message: "Video liked successfully", video });
    }
  } catch (error) {
    console.error("Error toggling like status:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  toggleLike,
};
