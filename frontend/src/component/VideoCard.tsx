import { Link } from "react-router-dom";

const VideoCard = (item: Video) => {
  console.log(item, "item");
  return (
    <div className=" flex flex-col space-y-2">
      <div className="cursor-pointer">
        <Link to={`/video/${item._id}`}>
          <img
            src={item.thumbnailUrl}
            alt="video"
            className="w-80 h-60 rounded-lg"
          />
        </Link>
      </div>

      <div className="flex justify-start px-2 space-x-2">
        <div className="w-10 ">
          <img src={item.channelImg} alt="" className=" w-full  rounded-full" />
        </div>
        <div className="w-40 ">
          <p className="text-md font-bold">{item.title}</p>

          <h1 className="text-sm font-semibold uppercase text-gray-600">
            {item.creator}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
