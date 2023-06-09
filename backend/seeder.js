require("dotenv").config();
const connectDB = require("./config/db");
const Video = require("./model/videoModel");
const videoData = require("./data/videos");

connectDB();

const importData = async () => {
  try {
    await Video.deleteMany({});

    await Video.insertMany(videoData);

    console.log("data imported");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
