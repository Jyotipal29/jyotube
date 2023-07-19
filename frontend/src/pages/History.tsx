import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect, useState } from "react";
import VideoCard from "../component/VideoCard";
import Layout from "../component/Layout";
import { RotatingLines } from "react-loader-spinner";

const History = () => {
  const [loading, setLoading] = useState(false);

  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { history },
    videoDispatch,
  } = useVideo();
  const getHistory = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get<Video[]>(`${api}history/`, config);
    videoDispatch({ type: "GET_HISTORY", payload: data });
    setLoading(false);
  };
  useEffect(() => {
    getHistory();
  }, []);

  const clearHistory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.delete(`${api}history/`, config);
    videoDispatch({ type: "CLEAR_HISTORY" });
  };
  return (
    <Layout>
      <div className="flex justify-end mb-2">
        <button
          onClick={clearHistory}
          className=" px-3 py-1 bg-white text-red-500 rounded-xl"
        >
          clear history
        </button>
      </div>
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
        <div className="grid  grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {history.map((item) => (
            <VideoCard {...item} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default History;
