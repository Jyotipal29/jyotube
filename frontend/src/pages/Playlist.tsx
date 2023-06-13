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

    const deletePlaylist = async (id: string) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      await axios.delete(`${api}playlist/${id}`, config);
      videoDispatch({ type: "DELETE_PLAYLIST", payload: id });
    };
    return (
      <div>
        {playlists.map((item) => (
          <div>
            <div className="flex justify-between px-12 bg-gray-600">
              <button onClick={() => deletePlaylist(item._id)}>delete</button>

              <p className=" py-2  text-center">{item.name}</p>
            </div>

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
