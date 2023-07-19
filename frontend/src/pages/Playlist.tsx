import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../component/Layout";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
type state = {
  id: null | string;
  isLoading: boolean;
};
const Playlist = () => {
  const [loading, setLoading] = useState(false);
  const [playLoading, setPLayLoading] = useState<state>({
    id: null,
    isLoading: false,
  });
  const [videoLoading, setVideoLoading] = useState<state>({
    id: null,
    isLoading: false,
  });

  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { playlists },
    videoDispatch,
  } = useVideo();
  const getPlaylist = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}playlist/`, config);
    videoDispatch({ type: "GET_PLAYLIST", payload: data });
    setLoading(false);
  };
  useEffect(() => {
    getPlaylist();
  }, []);

  const deletePlaylist = async (id: string) => {
    setPLayLoading({
      isLoading: true,
      id,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await axios.delete(`${api}playlist/${id}`, config);
    videoDispatch({ type: "DELETE_PLAYLIST", payload: id });
    setPLayLoading({
      isLoading: false,
      id: null,
    });
  };

  const deleteVideo = async (playlistId: string, videoId: string) => {
    setVideoLoading({ isLoading: true, id: videoId });
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
    setVideoLoading({ isLoading: false, id: null });
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center">
          <RotatingLines
            strokeColor="red"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        playlists.map((items) => (
          <div className="py-5">
            <div className="flex  justify-between px-12 shadow-md shadow-gray-600 ">
              <h1 className=" py-2 text-4xl tracking-widest uppercase text-center text-red-600">
                {items.name}
              </h1>

              <button
                className="text-red-600"
                onClick={() => deletePlaylist(items._id)}
              >
                {playLoading?.id === items._id && playLoading?.isLoading ? (
                  <div className="flex items-center justify-center">
                    <RotatingLines
                      strokeColor="red"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible={true}
                    />
                  </div>
                ) : (
                  <AiOutlineCloseCircle className="text-red-600 text-3xl cursor-pointer" />
                )}
              </button>
            </div>

            <div className="grid  mt-5 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
              {items.videos.map((item) => (
                <div className=" flex flex-col space-y-2 relative">
                  <div className="cursor-pointer">
                    <Link to={`/video/${item._id}`}>
                      <img
                        src={item.thumbnailUrl}
                        alt="video"
                        className="w-80 h-60 rounded-lg"
                      />
                    </Link>
                  </div>
                  <div className="absolute top-0 right-3  ">
                    <button onClick={() => deleteVideo(items._id, item._id)}>
                      {videoLoading?.id === item._id &&
                      videoLoading?.isLoading ? (
                        <div className="flex items-center justify-center">
                          <RotatingLines
                            strokeColor="red"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="20"
                            visible={true}
                          />
                        </div>
                      ) : (
                        <AiOutlineCloseCircle className="text-red-600 text-3xl cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-start px-2 space-x-2">
                    <div className="w-10 ">
                      <img
                        src={item.channelImg}
                        alt=""
                        className=" w-full  rounded-full object-cover"
                      />
                    </div>
                    <div className="w-40 ">
                      <p className="text-md font-bold text-gray-100">
                        {item.title}
                      </p>

                      <h1 className="text-sm font-semibold uppercase text-gray-100">
                        {item.creator}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </Layout>
  );
};

export default Playlist;
