import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Likes from "./pages/Likes";
import Video from "./pages/Video";
import Watchlater from "./pages/Watchlater";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Playlist from "./pages/Playlist";
import SearchResult from "./pages/SearchResult";
import PrivateRoutes from "./pages/PrivateRoutes";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/watchlater" element={<Watchlater />} />
            <Route path="/history" element={<History />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/like" element={<Likes />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
