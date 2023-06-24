import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { MdPlaylistAddCircle } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800  shadow-xl fixed top-0 left-0 w-full h-16 z-10 px-5 flex items-center justify-between ">
        <div className="flex items-center space-x-6">
          <button className="text-white" onClick={() => setOpen(!open)}>
            <AiOutlineMenu className="text-2xl  w-8 h-8 px-1 py-1" />
          </button>
          <div className="text-4xl uppercase text-red-500 font-charm  ">
            jyotube
          </div>
        </div>
        <div className="w-1/3 flex flex-col">
          <form className="flex items-center">
            <input className="border flex-1 border-gray-400 h-10 rounded-l-2xl text-white bg-gray-800 " />
            <button className="h-10 border border-gray-400 border-l-0 rounded-r-2xl  flex items-center px-2 text-white bg-gray-800">
              <AiOutlineSearch className="text-2xl" />
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-6">
          <p className="text-white uppercase font-lora border-2 border-red-500 w-10 h-10 rounded-full text-center py-1  text-xl">
            J
          </p>
          <button className="bg-red-500 w-18 rounded-md text-xl text-white   px-1 font-lora">
            login
          </button>
        </div>
      </nav>
      <aside
        className="bg-gray-800 h-full shadow-xl top-0 left-0 fixed mt-14  flex justify-center"
        style={{ width: open ? "250px" : "70px", transition: "0.2s" }}
      >
        <ul className="flex flex-col  space-y-4">
          <Link to="/">
            <li
              className={`flex ${
                open ? "flex-row " : "flex-col"
              }  items-center mt-5 space-x-2`}
            >
              <AiOutlineHome className=" text-white text-2xl" />
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
        className=" mt-16 px-3 py-3 space-y-2 bg-gray-900"
        style={{ marginLeft: open ? "250px" : "70px", transition: "0.2s" }}
      >
        {children}
      </section>
    </div>
  );
};

export default Layout;
