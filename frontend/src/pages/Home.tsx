import axios from "axios";
import { api } from "../constant/api";
import { useEffect } from "react";
import { useVideo } from "../context/videoContext/videoContext";
import VideoCard from "../component/VideoCard";
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
  const {
    videoState: { videos, selectedCategory },
    videoDispatch,
  } = useVideo();
  const getVideos = async () => {
    const { data } = await axios.get<Video[]>(`${api}video/`);
    videoDispatch({ type: "GET_VIDEOS", payload: data });
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
    <div className=" py-8">
      <div className=" flex  justify-center  flex-wrap space-x-4 mb-3">
        {cat.map((item) => (
          <button
            key={item.id}
            className={`border-2 px-4 rounded-md py-1 cursor-pointer ${
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
      <div className="container mx-auto  px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
          {filteredVideos.map((item) => (
            <VideoCard {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
