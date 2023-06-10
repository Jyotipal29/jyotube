export {};
declare global {
  type Video = {
    _id: string;
    thumbnailUrl: string;
    tag: string[];
    title: string;
    creator: string;
    likes: string[];
    watchlater: string[];
    videoUrl: string;
    channelImg: string;
  };
  type VideoState = {
    videos: Video[];
    watchlater: Video[];
    liked: Video[];
    video: Video | object;
  };

  type VideoAction =
    | { type: "GET_VIDEOS"; payload: Video[] }
    | { type: "GET_VIDEO"; payload: Video }
    | { type: "Like_VIDEO"; payload: Video }
    | { type: "ADD_WATCHLATER"; payload: Video };

  type VideoContextType = {
    videoState: VideoState;
    videoDispatch: React.Dispatch<VideoAction>;
  };
}
