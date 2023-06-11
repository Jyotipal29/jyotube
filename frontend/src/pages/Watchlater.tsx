import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext/userContext";
import VideoCard from "../component/VideoCard";

const Watchlater = () => {
  const [watchLater, setWatchLater] = useState([]);
  const {
    userState: { user },
  } = useUser();
  const getWatchLaterVideos = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}watchlater/`, config);
    console.log(data.videos, "liked data");
    setWatchLater(data.videos);
  };

  useEffect(() => {
    getWatchLaterVideos();
  }, []);
  console.log(watchLater, "liked vidios");
  return (
    <div>
      {watchLater.map((item: Video) => (
        <VideoCard {...item} />
      ))}
    </div>
  );
};

export default Watchlater;
