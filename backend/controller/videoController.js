const Video = require("../model/videoModel");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSearch = async (req, res) => {
  const { query } = req.query;

  try {
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { creator: { $regex: query, $options: "i" } },
      ],
    });

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getRecommendations = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the selected video by its ID
    const selectedVideo = await Video.findById(id);

    if (!selectedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    let recommendations = [];

    // If the selected video has a category, find other videos with the same category
    if (selectedVideo.tag && selectedVideo.tag.length > 0) {
      // If the selected video has tags, find other videos with the same tags
      recommendations = await Video.find({
        tag: { $in: selectedVideo.tag },
        _id: { $ne: selectedVideo._id }, // Exclude the selected video itself from recommendations
      }).limit(5); // Limit the number of recommendations to 5
    } else if (selectedVideo.creator) {
      // If the selected video has a creator, find other videos by the same creator
      recommendations = await Video.find({
        creator: selectedVideo.creator,
        _id: { $ne: selectedVideo._id }, // Exclude the selected video itself from recommendations
      }).limit(5); // Limit the number of recommendations to 5
    }

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get video recommendations" });
  }
};

module.exports = {
  getVideos,
  getVideo,
  getSearch,
  getRecommendations,
};
