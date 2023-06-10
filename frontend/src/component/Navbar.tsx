import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-8 flex justify-between items-center py-3">
        <div className="text-red-600 uppercase text-2xl ">
          <Link to="/">jyotube</Link>
        </div>
        <ul className="text-white flex space-x-8 uppercase text-lg">
          <li>
            <Link to="/like">like</Link>
          </li>
          <li>
            <Link to="/watchlater">watchlater</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
