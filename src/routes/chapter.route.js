var express = require("express");
var router = express.Router();
const multer = require("multer");
const imageUploads = require("../utils/imageUpload");
const cors = require("cors");
// controllers
const ChapterController = require("../controllers/chapter.controller");

// define the home page route
const options = {
  origin: true,
  methods: ["POST", "GET"],
  credentials: true,
  maxAge: 3600,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"]
};

router.get("/:courseid", ChapterController.chapters);
router.post("/:courseid", ChapterController.create);
// router.get("/:id", ChapterController.read);
// router.post("/create", ChapterController.create);
router.post("/:chapterid", ChapterController.addLesson);
router.post("/remove/:id", ChapterController.remove);
router.post("/update/:id", ChapterController.update);
router.post(
  "/upload/file",

  imageUploads().single("file"),
  ChapterController.upload
);

module.exports = router;
