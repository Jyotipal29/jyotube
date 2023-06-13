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

module.exports = {
  getVideos,
  getVideo,
  getSearch,
};
