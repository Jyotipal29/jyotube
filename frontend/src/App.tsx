import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Likes from "./pages/Likes";
import Video from "./pages/Video";
import Watchlater from "./pages/Watchlater";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Playlist from "./pages/Playlist";
import SearchResult from "./pages/SearchResult";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/like" element={<Likes />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/watchlater" element={<Watchlater />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
