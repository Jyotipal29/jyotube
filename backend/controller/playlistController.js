const Playlist = require("../model/playlistModel");
const createPlaylist = async (req, res) => {
  try {
    const { name, video } = req.body;
    const { user } = req;

    const playlist = new Playlist({
      user: user._id,
      name,
      videos: [video],
    });

    await playlist.save();

    res.status(201).json(playlist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPlaylist,
};
