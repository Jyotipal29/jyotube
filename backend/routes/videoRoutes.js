const express = require("express");

const router = express.Router();

const {
  getVideo,
  getVideos,
  getSearch,
  getRecommendations,
} = require("../controller/videoController");

router.get("/", getVideos);
router.get("/find/:id", getVideo);
router.get("/search", getSearch);
router.get("/rcmdt/:id", getRecommendations);

module.exports = router;
