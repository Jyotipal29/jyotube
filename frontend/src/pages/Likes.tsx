import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext/userContext";
import VideoCard from "../component/VideoCard";
const Likes = () => {
  const [likedVideo, setLikedVideo] = useState([]);
  const {
    userState: { user },
  } = useUser();
  const getLikedVideos = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}like/`, config);
    console.log(data.videos, "liked data");
    setLikedVideo(data.videos);
  };

  useEffect(() => {
    getLikedVideos();
  }, []);
  console.log(likedVideo, "liked vidios");
  return (
    <div>
      {likedVideo.map((item: Video) => (
        <VideoCard {...item} />
      ))}
    </div>
  );
};

export default Likes;
