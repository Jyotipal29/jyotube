const VideoCard = (item: Video) => {
  console.log(item, "item");
  return (
    <div className="">
      <img
        src={item.thumbnailUrl}
        alt="video"
        className="w-80 h-60 rounded-lg"
      />
      <p className="text-xl font-bold">{item.title}</p>

      <h1 className="text-md text-slate-500 uppercase">{item.creator}</h1>
    </div>
  );
};

export default VideoCard;
