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
    <div>
      {recommend.map((item) => (
        <div>
          <img src={item.thumbnailUrl} className="w-20" />
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
