import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { CgPlayListAdd } from "react-icons/cg";
import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useVideo } from "../context/videoContext";
const Video = () => {
  const { id } = useParams();
  const [currVideo, setCurrVideo] = useState<Video | null>(null);
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

  console.log(video, "video ");
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
          <AiOutlineLike className="text-white text-2xl md:text-4xl cursor-pointer" />
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
