import { Link } from "react-router-dom";
import { useVideo } from "../context/videoContext/videoContext";

const SearchResult = () => {
  const {
    videoState: { searchResult },
  } = useVideo();

  console.log(searchResult, "search page");
  return (
    <div>
      {searchResult.map((item) => (
        <div className="">
          <div>
            <Link to={`/video/${item._id}`}>
              <img
                src={item.thumbnailUrl}
                alt="video"
                className="w-80 h-60 rounded-lg"
              />
            </Link>
          </div>
          <div>
            <p>{item.title}</p>
            <p>{item.creator}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
