import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
import { useUser } from "../context/userContext/userContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
    <>
      {recommend.map((item) => (
        <Link to={`/video/${item?._id}`}>
          <div className="flex mb-3 bg-black  h-72 ">
            <div
              className="relative h-40 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px]   overflow-hidden
              "
            >
              <img
                className="h-full w-full object-cover "
                src={item.thumbnailUrl}
              />
            </div>
            <div className="flex flex-col space-y-5 ml-3 overflow-hidden py-4">
              <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                {item?.title}
              </span>
              <div className="flex">
                <div className="flex items-start">
                  <div className="flex h-8 w-8 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={item?.channelImg}
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-3 ">
                  <div className="text-white text-md font-semibold flex items-center ">
                    {item?.creator}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Recommendation;
