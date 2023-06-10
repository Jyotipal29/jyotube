import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
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
    videoState: { video },
    videoDispatch,
  } = useVideo();
  const getVideo = async () => {
    const { data } = await axios.get<Video>(`${api}video/find/${id}`);
    setCurrVideo(data);
    videoDispatch({ type: "GET_VIDEO", payload: data });
    console.log(data, " one data");
  };
  useEffect(() => {
    getVideo();
  }, [id]);

  // like handler

  const likeHandler = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8000/like/toggel/${id}`,
      config
    );
    console.log(data, "like data");
  };

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
          <button onClick={() => currVideo?._id && likeHandler(currVideo._id)}>
            {currVideo?.likes.includes(currVideo?._id) ? (
              <AiFillLike className="text-white text-2xl md:text-4xl cursor-pointer" />
            ) : (
              <AiOutlineLike className="text-white text-2xl md:text-4xl cursor-pointer" />
            )}
          </button>
        </div>
        <div className="flex items-center">
          <MdOutlineWatchLater className="text-white text-2xl md:text-4xl cursor-pointer" />
        </div>
        <div className="flex items-center justify-center">
          <CgPlayListAdd className="text-white text-2xl md:text-4xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Video;
