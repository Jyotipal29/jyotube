import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { MdPlaylistAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sticky left-0 top-16 bottom-0 w-full h-screen">
      <ul className="w-64  bg-gray-900 h-screen flex flex-col space-y-10 items-start px-10">
        <li className="mt-10">
          <Link to="/like">
            <AiFillLike className=" text-white text-4xl" />
          </Link>
        </li>
        <li>
          <Link to="/watchlater">
            <MdWatchLater className="text-white text-4xl" />
          </Link>
        </li>
        <li>
          <Link to="/history">
            <FaHistory className="text-white text-4xl" />
          </Link>
        </li>
        <li>
          <Link to="/playlist">
            <MdPlaylistAddCircle className="text-white text-4xl" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
