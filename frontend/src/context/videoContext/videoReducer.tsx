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
    case "TOGGLE_LIKE": {
     

      const isLiked = videoState.liked.some((item) => item._id === action.payload._id);
        

      return {
        ...videoState,
        liked: isLiked
          ?videoState.liked.filter((video) => video._id !== action.payload._id):
          [...videoState.liked, action.payload]
         
      };
    }

    default:
      return videoState;
  }
};