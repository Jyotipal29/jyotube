import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect, useState } from "react";
import VideoCard from "../component/VideoCard";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
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
    console.log(data, "hsitory page data");
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
    console.log("history deleted");
  };
  console.log(history, "the history it is");
  return (
    <Layout>
      <div>
        <button
          onClick={clearHistory}
          className="border-2 px-3 py-1 text-red-500 bg-gray-800"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-4">
          {history.map((item) => (
            <VideoCard {...item} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default History;
