import { Link } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { userState } = useUser();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-8 flex justify-between items-center py-3">
        <div className="text-red-600 uppercase text-2xl ">
          <Link to="/">jyotube</Link>
        </div>
        <ul className="text-white flex space-x-2 uppercase ">
          <li>
            <Link to="/like">like</Link>
          </li>
          <li>
            <Link to="/watchlater">watchlater</Link>
          </li>
          {userState?.user?.token ? (
            <>
              <p className="border-2 rounded-full px-2 text-yellow-400 border-yellow-400">
                {userState?.user?.name?.charAt(0)}
              </p>
              <button onClick={logoutHandler}>logout</button>
            </>
          ) : (
            <button className="bg-black text-white py-1 px-3 rounded-md">
              <Link to="/login">login</Link>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
