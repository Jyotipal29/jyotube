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
const Video = () => {
  const { id } = useParams();
  const [currVideo, setCurrVideo] = useState<Video | null>(null);
  const navigate = useNavigate();
  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { video, liked, watchlater, history },
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
    console.log(data, "history video");
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

  return (
    <div className="container mx-auto px-6 mt-5 rounded-lg">
      <div className="flex justify-center ">
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
          <button onClick={() => currVideo?._id && likeHandler(currVideo?._id)}>
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
          <CgPlayListAdd className="text-white text-2xl md:text-4xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Video;
