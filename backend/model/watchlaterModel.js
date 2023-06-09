const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
});

const Watchlater = mongoose.model("Save", saveSchema);

module.exports = Watchlater;
