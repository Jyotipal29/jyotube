import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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

  const deleteVideo = async (playlistId: string, videoId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await axios.delete(`${api}playlist/${playlistId}/${videoId}`, config);
    videoDispatch({
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      payload: {
        playlistId,
        videoId,
      },
    });
  };
  return (
    <div>
      {playlists.map((items) => (
        <div>
          <div className="flex justify-between px-12 bg-gray-600">
            <button onClick={() => deletePlaylist(items._id)}>delete</button>

            <p className=" py-2  text-center">{items.name}</p>
          </div>

          <div className="grid grid-cols-2">
            {items.videos.map((item) => (
              <div>
                <div className=" flex flex-col space-y-2">
                  <button onClick={() => deleteVideo(items._id, item._id)}>
                    delete
                  </button>
                  <div className="cursor-pointer">
                    <Link to={`/video/${item._id}`}>
                      <img
                        src={item.thumbnailUrl}
                        alt="video"
                        className="w-80 h-60 rounded-lg"
                      />
                    </Link>
                  </div>

                  <div className="flex justify-start px-2 space-x-2">
                    <div className="w-10 ">
                      <img
                        src={item.channelImg}
                        alt=""
                        className=" w-full  rounded-full"
                      />
                    </div>
                    <div className="w-40 ">
                      <p className="text-md font-bold">{item.title}</p>

                      <h1 className="text-sm font-semibold uppercase text-gray-600">
                        {item.creator}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
