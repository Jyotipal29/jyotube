const Video = require("../model/videoModel");
const Like = require("../model/likeModel");

// Route for toggling the like status of a video
const toggleLike = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Find the like associated with the user and the video
    const like = await Like.findOne({ user: req.user, video: videoId });

    if (like) {
      // If the user already liked the video, remove the like
      video.likes.pull(like._id);
      await video.save();
      await like.remove();
      return res.json({ message: "Video unliked successfully",video,like });
    } else {
      // If the user hasn't liked the video, create a new like
      const newLike = new Like({ user: req.user, video: videoId });
      await newLike.save();
      video.likes.push(newLike);
      await video.save();
      return res.json({ message: "Video liked successfully", video, like });
    }
  } catch (error) {
    console.error("Error toggling like status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  toggleLike,
};
