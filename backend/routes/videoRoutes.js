const express = require("express");

const router = express.Router();

const { getVideo, getVideos } = require("../controller/videoController");

router.get("/", getVideos);
router.get("/video/:id", getVideo);

module.exports = router;
