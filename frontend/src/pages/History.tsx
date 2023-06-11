import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect } from "react";
import VideoCard from "../component/VideoCard";
import { Link } from "react-router-dom";
const History = () => {
  const {
    userState: { user },
  } = useUser();
  const {
    videoState: { history },
    videoDispatch,
  } = useVideo();
  const getHistory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get<Video[]>(`${api}history/`, config);
    videoDispatch({ type: "GET_HISTORY", payload: data });
    console.log(data, "hsitory page data");
  };
  useEffect(() => {
    getHistory();
  }, []);
  console.log(history, "the history it is");
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-4">
      {history.map((item) => (
        <VideoCard {...item} />
      ))}
    </div>
  );
};

export default History;
