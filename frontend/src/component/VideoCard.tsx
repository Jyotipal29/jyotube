const VideoCard = (item: Video) => {
  console.log(item, "item");
  return (
    <div>
      <div>
        <img src={item.thumbnailUrl} alt="video" className="w-80" />
        <h1>{item.creator}</h1>
        <p>{item.title}</p>
      </div>
    </div>
  );
};

export default VideoCard;
