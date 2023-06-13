const express = require("express");

const router = express.Router();

const {
  getVideo,
  getVideos,
  getSearch,
} = require("../controller/videoController");

router.get("/", getVideos);
router.get("/find/:id", getVideo);
router.get("/search", getSearch);

module.exports = router;
