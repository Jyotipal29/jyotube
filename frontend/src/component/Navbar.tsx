import { Link } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

import { useState } from "react";
import axios from "axios";
import { api } from "../constant/api";
import { useVideo } from "../context/videoContext/videoContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { userState } = useUser();
  const { videoDispatch } = useVideo();
  const [searchQuery, setSearchQuery] = useState("");
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = async () => {
    const { data } = await axios.get<Video[]>(`${api}video/search`, {
      params: { query: searchQuery },
    });

    videoDispatch({ type: "GET_SEARCH", payload: data });
    navigate("/search");
    setSearchQuery("");
    console.log(data, "search data");
  };
  return (
    // <div className="bg-gray-900 sticky left-0 top-0 w-full ">
    //   <div className="container mx-auto px-8 flex justify-between items-center h-16 py-3">
    //     <div className="text-red-600 uppercase text-2xl ">
    //       <Link to="/">jyotube</Link>
    //     </div>
    //     <div className=" flex ">
    //       <input
    //         type="text"
    //         value={searchQuery}
    //         onChange={(e) => setSearchQuery(e.target.value)}
    //         placeholder="search"
    //         className="bg-transparent border-2 py-1 px-2 rounded-2xl border-r-0 rounded-r-none"
    //       />
    //       <button className="text-white " onClick={handleSearch}>
    //         <BiSearch className="text-4xl border-2 text-white  py-1  rounded-2xl  rounded-l-none" />
    //       </button>
    //     </div>
    //     <ul className="text-white flex space-x-4 uppercase ">
    //       {userState?.user?.token ? (
    //         <>
    //           <p className="border-2 rounded-full px-2 text-yellow-400 border-yellow-400">
    //             {userState?.user?.name?.charAt(0)}
    //           </p>
    //           <button
    //             onClick={logoutHandler}
    //             className="bg-red-500 px-2 rounded-md"
    //           >
    //             logout
    //           </button>
    //         </>
    //       ) : (
    //         <button className="bg-black text-white py-1 px-3 rounded-md">
    //           <Link to="/login">login</Link>
    //         </button>
    //       )}
    //     </ul>
    //   </div>
    // </div>
    <div className="border-2 border-red-500 p-4"></div>
  );
};

export default Navbar;
