import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext/userContext";
import VideoCard from "../component/VideoCard";
import { useVideo } from "../context/videoContext/videoContext";
import Layout from "../component/Layout";
import { RotatingLines } from "react-loader-spinner";

const Watchlater = () => {
  const [watchLater, setWatchLater] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { watchlater },
    videoDispatch,
  } = useVideo();
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
  console.log(watchLater, "liked vidios");
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-4">
          {watchlater.map((item: Video) => (
            <VideoCard {...item} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Watchlater;
