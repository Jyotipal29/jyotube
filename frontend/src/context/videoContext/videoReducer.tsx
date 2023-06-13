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
                videos: [...playlist.videos, action.payload.video],
              }
            : playlist
        ),
      };
    default:
      return videoState;
  }
};
