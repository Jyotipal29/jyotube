import { useParams } from "react-router-dom";
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
const Video = () => {
  const { id } = useParams();
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
    const { data } = await axios.get<Video>(`${api}video/find/${id}`);
    setCurrVideo(data);
    videoDispatch({ type: "GET_VIDEO", payload: data });
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
  };

  const watchHandler = async (id: string) => {
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

    console.log(data, "watched later data");
  };
  const isVideoLiked =
    currVideo && liked.some((item) => item._id === currVideo._id);

  const isSaved =
    currVideo && watchlater.some((item) => item._id === currVideo._id);

  // add to playlist
  const addToPlaylist = async (id: string) => {
    console.log(currVideo, "currVideo");
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
    console.log(data, "add to playlist data");
    videoDispatch({ type: "ADD_TO_PLAYLIST", payload: data });
  };

  //create playlist
  const createPlaylist = async () => {
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
  };
  return (
    <Layout>
      <div className="flex  flex-col  lg:flex-row items-start justify-center">
        <div className="container mx-auto px-6 mt-5 rounded-lg ">
          <div className="">
            <iframe
              width="100%"
              height="500px"
              title="youtube video"
              src={currVideo?.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-gray-900 flex justify-between items-center  px-2 py-3 ">
            <div className="flex items-center">
              <button
                onClick={() => currVideo?._id && likeHandler(currVideo?._id)}
              >
                {isVideoLiked ? (
                  <AiFillLike className="text-white text-2xl md:text-4xl cursor-pointer" />
                ) : (
                  <AiOutlineLike className="text-white text-2xl md:text-4xl cursor-pointer" />
                )}
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => currVideo?._id && watchHandler(currVideo?._id)}
              >
                {isSaved ? (
                  <MdWatchLater className="text-white text-2xl md:text-4xl cursor-pointer" />
                ) : (
                  <MdOutlineWatchLater className="text-white text-2xl md:text-4xl cursor-pointer" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <CgPlayListAdd
                className="text-white text-2xl md:text-4xl cursor-pointer"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md">
                {/* <h3 className="text-lg font-bold mb-4">Add to Playlist</h3> */}
                {/* <select
              className="border border-gray-300 rounded-md p-2 mb-4"
              onChange={(e) => addToPlaylist(e.target.value)}
            >
              <option value="">Select an existing playlist</option>
              {playlists.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select> */}
                <div className="border border-gray-300 rounded-md p-2 mb-4">
                  <p>Select an existing playlist:</p>
                  {playlists?.map((item) => (
                    <div key={item._id}>
                      <input
                        type="checkbox"
                        id={item._id}
                        value={item._id}
                        onChange={(e) => addToPlaylist(e.target.value)}
                      />
                      <label htmlFor={item._id}>{item.name}</label>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 mb-4"
                    placeholder="Enter a new playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <button
                    className="bg-red-400 text-white rounded-md px-4 py-2"
                    onClick={createPlaylist}
                  >
                    Create New Playlist
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
        <div className="mt-5 px-6 md:ml-6 ">
          {id && <Recommendation id={id} />}
        </div>
      </div>
    </Layout>
  );
};

export default Video;
