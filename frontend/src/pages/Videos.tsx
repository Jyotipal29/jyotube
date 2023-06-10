import axios from "axios";
import { api } from "../constant/api";
import { useEffect } from "react";
import { useVideo } from "../context/videoContext";
import VideoCard from "../component/VideoCard";

const Videos = () => {
  const {
    videoState: { videos },
    videoDispatch,
  } = useVideo();
  const getVideos = async () => {
    const { data } = await axios.get<Video[]>(`${api}video/`);
    videoDispatch({ type: "GET_VIDEOS", payload: data });
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      {videos.map((item) => (
        <VideoCard {...item} />
      ))}
    </div>
  );
};

export default Videos;
