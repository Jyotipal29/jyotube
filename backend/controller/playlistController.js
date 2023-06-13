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
const addToPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { video } = req.body;

    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    playlist.videos.push(video);
    await playlist.save();

    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error adding video to playlist:", error);
    res.status(500).json({ message: error.message });
  }
};
const getPlaylists = async (req, res) => {
  try {
    const { user } = req;

    const playlists = await Playlist.find({ user: user._id }).populate(
      "videos"
    );

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error retrieving user playlists:", error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  createPlaylist,
  addToPlaylist,
  getPlaylists,
};
