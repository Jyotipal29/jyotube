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
  type Playlist = {
    _id: string;
    name: string;
    videos: Video[];
  };
  type VideoState = {
    videos: Video[];
    watchlater: Video[];
    liked: Video[];
    history: Video[];
    video: Video | object;
    playlists: Playlist[];
    searchResult: Video[];
    recommend: Video[];
    selectedCategory: string;
  };
  type AddToPlaylistPayload = {
    _id: string;
    playlistId: string;
    video: Video;
  };

  type CreatePlaylistPayload = {
    _id: string;
    name: string;
    video: Video;
  };
  type VideoAction =
    | { type: "GET_VIDEOS"; payload: Video[] }
    | { type: "GET_VIDEO"; payload: Video }
    | { type: "Like_VIDEO"; payload: Video[] }
    | { type: "ADD_WATCHLATER"; payload: Video[] }
    | { type: "TOGGLE_LIKE"; payload: Video }
    | { type: "TOGGLE_WATCHLATER"; payload: Video }
    | { type: "ADD_HISTORY"; payload: Video }
    | { type: "GET_HISTORY"; payload: Video[] }
    | { type: "CLEAR_HISTORY" }
    | { type: "CREATE_PLAYLIST"; payload: CreatePlaylistPayload }
    | { type: "GET_PLAYLIST"; payload: CreatePlaylistPayload }
    | { type: "ADD_TO_PLAYLIST"; payload: AddToPlaylistPayload }
    | { type: "GET_SEARCH"; payload: Video[] }
    | { type: "SET_CATEGORY"; payload: string }
    | { type: "GET_RCMDT"; payload: Video[] };

  type VideoContextType = {
    videoState: VideoState;
    videoDispatch: React.Dispatch<VideoAction>;
  };

  type User = {
    name: string;
    email: string;
    password: string;
    token: string;
  };
  type UserState = {
    user: User | null;
  };
  type UserAction =
    | { type: "LOGIN"; payload: User }
    | { type: "REGISTER"; payload: User };

  type UserContextType = {
    userState: UserState;
    userDispatch: React.Dispatch<UserAction>;
  };
}
