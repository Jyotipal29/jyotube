import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect } from "react";
type Id = {
  id: string;
};
const Recommendation = ({ id }: Id) => {
  const {
    videoState: { recommend },
    videoDispatch,
  } = useVideo();
  const getVideo = async () => {
    const { data } = await axios.get<Video[]>(`${api}video/rcmdt/${id}`);
    videoDispatch({ type: "GET_RCMDT", payload: data });
  };
  useEffect(() => {
    getVideo();
  }, [id]);

  return (
    <div className="">
      {recommend.map((item) => (
        <div className="flex mb-5 bg-gray-500 px-2 py-2 rounded-md">
          <div>
            <img src={item.thumbnailUrl} className="w-80 h-full" />
          </div>
          <div>
            <h1 className="text-gray-100">{item.title}</h1>
            <h1 className="text-gray-100">{item.creator}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
