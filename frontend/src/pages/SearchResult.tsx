import { Link } from "react-router-dom";
import { useVideo } from "../context/videoContext/videoContext";
import Layout from "../component/Layout";

const SearchResult = () => {
  const {
    videoState: { searchResult },
  } = useVideo();

  console.log(searchResult, "search page");
  return (
    <Layout>
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
    </Layout>
  );
};

export default SearchResult;
