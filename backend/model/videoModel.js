const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  watchlater: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlater",
    },
  ],

  tag: {
    type: [String],
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
