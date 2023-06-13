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
  >(videoReducer, {
    videos: [],
    video: {},
    watchlater: [],
    liked: [],
    history: [],
    playlists: [],
    searchResult: [],
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
