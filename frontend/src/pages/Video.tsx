import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { CgPlayListAdd } from "react-icons/cg";
import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import Recommendation from "../component/Recommendation";
import Layout from "../component/Layout";
import { RotatingLines } from "react-loader-spinner";

const Video = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [sloading, setSLoading] = useState(false);
  const [lloading, setLLoading] = useState(false);

  const [currVideo, setCurrVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigate = useNavigate();
  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { liked, watchlater, playlists },
    videoDispatch,
  } = useVideo();
  const getVideo = async () => {
    setLoading(true);
    const { data } = await axios.get<Video>(`${api}video/find/${id}`);
    setCurrVideo(data);
    videoDispatch({ type: "GET_VIDEO", payload: data });
    setLoading(false);
  };
  useEffect(() => {
    getVideo();
  }, [id]);

  const addHistory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.post<Video>(`${api}history/${id}`, {}, config);
    videoDispatch({ type: "ADD_HISTORY", payload: data });
  };
  useEffect(() => {
    addHistory();
  }, [id]);

  const likeHandler = async (id: string) => {
    try {
      if (user?.token) {
        setLLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data } = await axios.post<Video>(
          `${api}like/toggel/${id}`,
          {},
          config
        );
        videoDispatch({ type: "TOGGLE_LIKE", payload: data });
        setLLoading(false);
      } else {
        navigate("/login");
      }
    } catch (error) {
      setLLoading(false);
    }
  };
  const getWatchLaterVideos = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get<Video[]>(`${api}watchlater/`, config);

    videoDispatch({ type: "ADD_WATCHLATER", payload: data });
    setLoading(false);
  };

  useEffect(() => {
    getWatchLaterVideos();
  }, []);
  const watchHandler = async (id: string) => {
    try {
      if (user?.token) {
        setSLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data } = await axios.post<Video>(
          `${api}watchlater/toggel/${id}`,
          {},
          config
        );
        videoDispatch({ type: "TOGGLE_WATCHLATER", payload: data });
        getWatchLaterVideos();
        setSLoading(false);
      } else {
        navigate("/login");
      }
    } catch (error) {
      setSLoading(false);
    }
  };
  const isVideoLiked =
    currVideo && liked.some((item) => item._id === currVideo._id);

  const isSaved =
    currVideo && watchlater.some((item) => item._id === currVideo._id);

  // add to playlist
  const addToPlaylist = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.post(
      `${api}playlist/${id}`,
      { video: currVideo },
      config
    );
    videoDispatch({ type: "ADD_TO_PLAYLIST", payload: data });
  };

  //create playlist
  const createPlaylist = async () => {
    try {
      if (user?.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data } = await axios.post<CreatePlaylistPayload>(
          `${api}playlist/`,
          { name: newPlaylistName, video: currVideo },
          config
        );
        videoDispatch({ type: "CREATE_PLAYLIST", payload: data });
        setShowModal(false);
        setNewPlaylistName("");
      } else {
        navigate("/login");
        setShowModal(false);
      }
    } catch (error) {
      setShowModal(false);
    }
  };
return (
  <Layout>
    <>
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
        <div className="flex justify-center flex-row  ">
          <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
            <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto bg-black">
              <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[400px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 ">
                <ReactPlayer
                  url={currVideo?.videoUrl}
                  controls
                  width="100%"
                  height="100%"
                  style={{ backgroundColor: "#000000" }}
                  playing={true}
                />
              </div>
              <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {currVideo?.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row mt-4">
                <div className="flex">
                  <div className="flex items-start">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={currVideo?.channelImg}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-3 mt-2">
                    <div className="text-white text-md font-semibold flex items-center text-xl">
                      {currVideo?.creator}
                    </div>
                  </div>
                </div>
                <div className="flex text-white mt-4 md:mt-0">
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                    <button
                      onClick={() =>
                        currVideo?._id && likeHandler(currVideo?._id)
                      }
                    >
                      {isVideoLiked ? (
                        lloading ? (
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
                          <AiFillLike className="text-red-600 text-2xl md:text-4xl cursor-pointer" />
                        )
                      ) : lloading ? (
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
                        <AiOutlineLike className="text-white text-2xl md:text-4xl cursor-pointer" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                    <button
                      onClick={() =>
                        currVideo?._id && watchHandler(currVideo?._id)
                      }
                    >
                      {isSaved ? (
                        sloading ? (
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
                          <MdWatchLater className="text-red-600 text-2xl md:text-4xl cursor-pointer" />
                        )
                      ) : sloading ? (
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
                        <MdOutlineWatchLater className="text-white text-2xl md:text-4xl cursor-pointer" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                    <CgPlayListAdd
                      className="text-white text-2xl md:text-4xl cursor-pointer"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                  {showModal && (
                    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-md">
                        <h3 className="text-lg text-black font-bold mb-4">
                          Add to Playlist
                        </h3>

                        <div className="border border-gray-300 rounded-md p-2 py-2 mb-4 space-y-3">
                          <p className="text-black">
                            Select an existing playlist
                          </p>
                          {playlists?.map((item) => (
                            <div key={item._id} className="space-x-2">
                              <input
                                type="checkbox"
                                id={item._id}
                                value={item._id}
                                onChange={(e) => addToPlaylist(e.target.value)}
                              />
                              <label
                                htmlFor={item._id}
                                className="text-black uppercase"
                              >
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="  space-x-4">
                          <input
                            type="text"
                            className="border text-black border-gray-300 bg-transparent rounded-md p-2 mb-4"
                            placeholder="Enter a new playlist name"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                          />
                          <button
                            className="bg-red-400 text-white rounded-md px-4 py-2"
                            onClick={createPlaylist}
                          >
                            Create
                          </button>
                        </div>
                        <button
                          className="bg-gray-200 text-gray-800 rounded-md px-4 py-2 mt-4"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col py-6 lg:py-0 lg:px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
              {id && <Recommendation id={id} />}
            </div>
          </div>
        </div>
      )}
    </>
  </Layout>
);
};

export default Video;
