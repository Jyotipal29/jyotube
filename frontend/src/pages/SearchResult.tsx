import { Link } from "react-router-dom";
import { useVideo } from "../context/videoContext/videoContext";
import Layout from "../component/Layout";

const SearchResult = () => {
  const {
    videoState: { searchResult },
  } = useVideo();

  return (
    <Layout>
      <div className="flex flex-col gap-5 space-y-5   max-w-sm  md:max-w-xl  justify-center mx-auto  ">
        {searchResult.map((item) => (
          <div className=" flex h-40 gap-2 sm:gap-3   items-center bg-black">
            <div className="w-1/2 ">
              <Link to={`/video/${item._id}`}>
                <img
                  src={item.thumbnailUrl}
                  alt="video"
                  className="  w-full h-full object-contain  "
                />
              </Link>
            </div>

            <div className="w-1/2  space-y-3">
              <p className="text-gray-100 text-sm sm:text-lg font-lora uppercase">
                {item.title}
              </p>
              <p className="text-gray-100 font-lora text-sm sm:text-md uppercase">
                {item.creator}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SearchResult;
