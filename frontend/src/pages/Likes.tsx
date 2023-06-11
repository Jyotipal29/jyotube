import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext/userContext";
import VideoCard from "../component/VideoCard";
import { useVideo } from "../context/videoContext/videoContext";
const Likes = () => {
  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { liked },
    videoDispatch,
  } = useVideo();
  const getLikedVideos = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get<Video[]>(`${api}like/`, config);

    console.log(data, "liked data 123");
    videoDispatch({ type: "Like_VIDEO", payload: data });
  };

  useEffect(() => {
    getLikedVideos();
  }, []);
  console.log(liked, "like page data  main");
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-4">
      {liked.map((item: Video) => (
        <VideoCard {...item} />
      ))}
    </div>
  );
};

export default Likes;
