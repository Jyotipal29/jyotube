const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const likeRoutes = require("./routes/likeRoutes");
const watchlaterRoutes = require("./routes/watchlaterRoutes");
const historyRoutes = require("./routes/historyRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/video", videoRoutes);
app.use("/like", likeRoutes);
app.use("/watchlater", watchlaterRoutes);
app.use("/history", historyRoutes);
app.use("/playlist", playlistRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening in port number ${port}`));
