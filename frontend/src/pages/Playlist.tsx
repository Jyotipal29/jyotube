import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect } from "react";
import VideoCard from "../component/VideoCard";

const Playlist = () => {
  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { playlists },
    videoDispatch,
  } = useVideo();
  const getPlaylist = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}playlist/`, config);
    videoDispatch({ type: "GET_PLAYLIST", payload: data });
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  console.log(playlists, "playlists");
  return (
    <div>
      {playlists.map((item) => (
        <div>
          <p className="bg-red-500 py-2 text-white text-center">{item.name}</p>
          <div className="grid grid-cols-2">
            {item.videos.map((item) => (
              <VideoCard {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
