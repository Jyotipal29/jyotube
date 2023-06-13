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
const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // Check if the playlist exists
    const playlist = await Playlist.findOne({ _id: id, user: user._id });
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Delete the playlist
    // await playlist.remove();
    await playlist.deleteOne();
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ error: "Server error" });
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

const removeVideoFromPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;
    const { user } = req;

    // Check if the playlist exists
    const playlist = await Playlist.findOne({
      _id: playlistId,
      user: user._id,
    });
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Check if the video exists in the playlist
    const videoIndex = playlist.videos.findIndex(
      (video) => video.toString() === videoId
    );
    if (videoIndex === -1) {
      return res.status(404).json({ error: "Video not found in playlist" });
    }

    // Remove the video from the playlist
    playlist.videos.splice(videoIndex, 1);
    await playlist.save();

    res
      .status(200)
      .json({ message: "Video removed from playlist successfully" });
  } catch (error) {
    console.error("Error removing video from playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  createPlaylist,
  addToPlaylist,
  getPlaylists,
  deletePlaylist,
  removeVideoFromPlaylist,
};
