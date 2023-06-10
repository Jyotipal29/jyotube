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
              video:action.payload
          }
    default:
      return videoState;
  }
};
