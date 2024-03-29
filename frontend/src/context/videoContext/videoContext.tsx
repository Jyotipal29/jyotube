import { createContext, useContext, useReducer } from "react";
import { videoReducer } from "./videoReducer";
type VideoProviderProps = {
  children: React.ReactNode;
};

const videoContext = createContext({} as VideoContextType);
export const useVideo = () => {
  return useContext(videoContext);
};

export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [videoState, videoDispatch] = useReducer<
    React.Reducer<VideoState, VideoAction>
  >(videoReducer as React.Reducer<VideoState, VideoAction>, {
    videos: [],
    video: {},
    watchlater: [],
    liked: [],
    history: [],
    playlists: [],
    searchResult: [],
    recommend: [],
    selectedCategory: "all",
  });

  return (
    <videoContext.Provider
      value={{
        videoState,
        videoDispatch,
      }}
    >
      {children}
    </videoContext.Provider>
  );
};
