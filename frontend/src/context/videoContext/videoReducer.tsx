export const videoReducer = (videoState: VideoState, action: VideoAction) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...videoState,
        videos: action.payload,
      };
    case "GET_VIDEO":
      return {
        ...videoState,
        video: action.payload,
      };
    case "Like_VIDEO":
      return {
        ...videoState,
        liked: action.payload,
      };
    case "ADD_WATCHLATER":
      return {
        ...videoState,
        watchlater: action.payload,
      };
    case "TOGGLE_LIKE": {
      const isLiked = videoState.liked.some(
        (item) => item._id === action.payload._id
      );

      return {
        ...videoState,
        liked: isLiked
          ? videoState.liked.filter((video) => video._id !== action.payload._id)
          : [...videoState.liked, action.payload],
      };
    }
    case "TOGGLE_WATCHLATER": {
      const isSaved = videoState.watchlater.some(
        (item) => item._id === action.payload._id
      );

      return {
        ...videoState,
        watchlater: isSaved
          ? videoState.watchlater.filter(
              (video) => video._id !== action.payload._id
            )
          : [...videoState.watchlater, action.payload],
      };
    }
    case "ADD_HISTORY":
      return {
        ...videoState,
        history: [...videoState.history, action.payload],
      };
    case "GET_HISTORY":
      return {
        ...videoState,
        history: action.payload,
      };
    case "CLEAR_HISTORY":
      return {
        ...videoState,
        history: [],
      };
    case "CREATE_PLAYLIST":
      return {
        ...videoState,
        playlists: [...videoState.playlists, action.payload],
      };
    case "GET_PLAYLIST":
      return {
        ...videoState,
        playlists: action.payload,
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...videoState,
        playlists: videoState.playlists.map((playlist) =>
          playlist._id === action.payload._id
            ? {
                ...playlist,
                videos: [...playlist.videos, action.payload.videos],
              }
            : playlist
        ),
      };
    case "GET_SEARCH":
      return {
        ...videoState,
        searchResult: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...videoState,
        selectedCategory: action.payload,
      };
    case "GET_RCMDT":
      return {
        ...videoState,
        recommend: action.payload,
      };
    case "DELETE_PLAYLIST":
      return {
        ...videoState,
        playlists: videoState.playlists.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "REMOVE_VIDEO_FROM_PLAYLIST": {
      const { playlistId, videoId } = action.payload;

      // Find the playlist index in the playlists array
      const playlistIndex = videoState.playlists.findIndex(
        (playlist) => playlist._id === playlistId
      );

      if (playlistIndex === -1) {
        // Playlist not found, return the current state
        return videoState;
      }

      // Retrieve the playlist from the state
      const playlist = { ...videoState.playlists[playlistIndex] };
      const updatedVideos = playlist.videos.filter(
        (video) => video._id !== videoId
      );

      // Update the playlist with the updated videos
      playlist.videos = updatedVideos;

      // Create a new playlists array with the updated playlist
      const updatedPlaylists = [
        ...videoState.playlists.slice(0, playlistIndex),
        playlist,
        ...videoState.playlists.slice(playlistIndex + 1),
      ];

      return {
        ...videoState,
        playlists: updatedPlaylists,
      };
    }
    default:
      return videoState;
  }
};
