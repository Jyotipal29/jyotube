const History = require("../model/historyModel");
const Video = require("../model/videoModel");

const addHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    const history = new History({
      user: user._id,
      video: id,
    });

    await history.save();

    res.status(200).json(video);
  } catch (error) {
    console.error("Error watching video:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getHistory = async (req, res) => {
  try {
  const { user } = req;

  const distinctVideoIds = await History.distinct("video", { user: user._id });

  const history = await Video.find({ _id: { $in: distinctVideoIds } }).sort({
    updatedAt: -1,
  });

  res.status(200).json(history);
  } catch (error) {
    console.error("Error retrieving watched videos:", error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  addHistory,
  getHistory,
};
