export const videoReducer = (videoState: VideoState, action: VideoAction) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...videoState,
        videos: action.payload,
      };
    default:
      return videoState;
  }
};
