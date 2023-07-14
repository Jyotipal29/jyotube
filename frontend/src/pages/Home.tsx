import axios from "axios";
import { api } from "../constant/api";
import { useEffect, useState } from "react";
import { useVideo } from "../context/videoContext/videoContext";
import VideoCard from "../component/VideoCard";
import Sidebar from "../component/Sidebar";
import Layout from "../component/Layout";
import { RotatingLines } from "react-loader-spinner";
const cat = [
  {
    id: 1,
    value: "all",
  },
  {
    id: 2,
    value: "hopping bug",
  },
  {
    id: 3,
    value: "manali",
  },
  {
    id: 4,
    value: "shimla",
  },
  {
    id: 5,
    value: "shillong",
  },
  {
    id: 6,
    value: "varanasi",
  },
  {
    id: 7,
    value: "goa",
  },
  {
    id: 8,
    value: "ankit bhatia",
  },
  {
    id: 8,
    value: "tanya",
  },
];
const Home = () => {
  const [loading, setLoading] = useState(false);
  const {
    videoState: { videos, selectedCategory },
    videoDispatch,
  } = useVideo();
  const getVideos = async () => {
    setLoading(true);
    const { data } = await axios.get<Video[]>(`${api}video/`);
    videoDispatch({ type: "GET_VIDEOS", payload: data });
    setLoading(false);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.tag.includes(selectedCategory));

  console.log(filteredVideos, "filtered videos");
  return (
    <Layout>
      <div
        className="flex justify-start space-x-4 overflow-x-auto hide-scrollbar"
        style={{ scrollBehavior: "smooth", width: "100%" }}
      >
        <div className="whitespace-nowrap">
          {cat.map((item) => (
            <button
              key={item.id}
              className={`border-2 w-auto py-1 px-3 mr-4  rounded-md cursor-pointer whitespace-nowrap ${
                selectedCategory === item.value ? "bg-gray-500" : "bg-gray-800"
              } uppercase text-white active:text-red-500`}
              onClick={() =>
                videoDispatch({ type: "SET_CATEGORY", payload: item.value })
              }
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <RotatingLines strokeColor="red" />
        </div>
      ) : (
        <div className="grid  grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {filteredVideos.map((item) => (
            <VideoCard {...item} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
