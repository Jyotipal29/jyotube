import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { MdPlaylistAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import { useVideo } from "../context/videoContext/videoContext";
import axios from "axios";
import { api } from "../constant/api";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

// import { AiOutlineSearch } from "react-icons/ai";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [searchbar, toggleSearchBar] = useState(false);

  const navigate = useNavigate();
  const {
    userState: { user },
  } = useUser();
  const { videoDispatch } = useVideo();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data } = await axios.get<Video[]>(`${api}video/search`, {
      params: { query: searchQuery },
    });

    videoDispatch({ type: "GET_SEARCH", payload: data });
    navigate("/search");
    setSearchQuery("");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-gray-900  shadow-xl fixed top-0 left-0 w-full h-16 z-10 px-5 flex items-center justify-between ">
        <div className="flex items-center space-x-6">
          <button
            className="text-white hidden sm:block"
            onClick={() => setOpen(!open)}
          >
            <AiOutlineMenu className="text-2xl  w-8 h-8 px-1 py-1" />
          </button>
          <div className="text-4xl uppercase text-red-500 font-charm  ">
            jyotube
          </div>
        </div>
        <div className="w-1/3 flex max-md:w-full items-center">
          <form
            className={`flex items-center flex-nowrap w-full h-full max-md:hidden max-md:h-14 max-md:bg-zinc-500 ${
              searchbar
                ? "max-md:!absolute max-md:left-0 max-md:!flex max-md:!w-[100vw] max-md:z-[99]"
                : ""
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search"
              className="px-5 bg-zinc-600 h-10 rounded-tl-full rounded-bl-full outline-none text-gray-200 w-full max-md:ml-[40px] max-w-[100%-40px]"
            />
            <button
              type="submit"
              onClick={handleSearch}
              className=" text-gray-300 md:bg-zinc-500 h-10 md:rounded-tr-full md:rounded-br-full px-2 "
            >
              <AiOutlineSearch className="text-2xl" />
            </button>
          </form>
          <span
            onClick={() => toggleSearchBar(!searchbar)}
            className={`ext-gray-500 ml-auto md:!hidden ${
              searchbar ? "ml-0 z-[999] fixed left-0" : ""
            }`}
          >
            {searchbar ? (
              <AiOutlineCloseCircle className="w-10 h-10 p-2 rounded-full bg-zinc-500 text-gray-300" />
            ) : (
              <AiOutlineSearch className="w-10 h-10 p-2 rounded-full bg-zinc-500 text-gray-300" />
            )}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          {user?.token && (
            <p className="text-white uppercase font-lora border-2 border-red-500 w-10 h-10 rounded-full text-center py-1  text-xl">
              {user?.name?.charAt(0)}
            </p>
          )}
          {user?.token ? (
            <FiLogOut
              className="text-white text-3xl cursor-pointer"
              onClick={logout}
            />
          ) : (
            <Link to="/login">
              <button className="bg-red-500 w-18 rounded-md text-xl text-white   px-1 font-lora">
                login
              </button>
            </Link>
          )}
        </div>
      </nav>
      <aside
        className="bg-gray-900 h-full shadow-xl top-0 left-0 fixed mt-14  flex justify-center"
        style={{ width: open ? "250px" : "70px", transition: "0.2s" }}
      >
        <ul className="flex flex-col  space-y-4">
          <Link to="/">
            <li
              className={`flex ${
                open ? "flex-row " : "flex-col"
              }  items-center mt-5 space-x-2`}
            >
              <AiFillHome className=" text-white text-2xl" />
              {open && (
                <span className="text-lg text-white font-lora mt-2">Home</span>
              )}
            </li>
          </Link>
          <Link to="/like">
            <li
              className={`flex ${
                open ? "flex-row " : "flex-col"
              }  items-center mt-5 space-x-2`}
            >
              <AiFillLike className=" text-white text-2xl" />
              {open && (
                <span className="text-lg text-white font-lora mt-2">Like</span>
              )}
            </li>
          </Link>

          <Link to="/watchlater">
            <li
              className={`flex ${
                open ? "flex-row" : "flex-col"
              }  items-center mt-5 space-x-2`}
            >
              <MdWatchLater className="text-white text-2xl" />
              {open && (
                <span className="text-lg text-white font-lora mt-2">
                  Watchlater
                </span>
              )}
            </li>
          </Link>

          <Link to="/history">
            <li
              className={`flex ${
                open ? "flex-row" : "flex-col"
              }  items-center mt-5 space-x-2`}
            >
              <FaHistory className="text-white text-2xl" />
              {open && (
                <span className="text-lg text-white font-lora mt-2">
                  History
                </span>
              )}
            </li>
          </Link>

          <Link to="/playlist">
            <li
              className={`flex ${
                open ? "flex-row" : "flex-col"
              }  items-center mt-5 space-x-2`}
            >
              <MdPlaylistAddCircle className="text-white text-2xl" />
              {open && (
                <span className="text-lg text-white font-lora mt-2">
                  Playlist
                </span>
              )}
            </li>
          </Link>
        </ul>
      </aside>
      <section
        className="mt-16 space-y-2 fixed inset-0 overflow-y-auto bg-zinc-800 p-5"
        style={{ marginLeft: open ? "250px" : "70px", transition: "0.2s" }}
      >
        {children}
      </section>
    </div>
  );
};

export default Layout;
