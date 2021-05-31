var express = require("express");
var router = express.Router();
// controllers
const CourseController = require("../controllers/course.controller");

// define the home page route
router.get("/", CourseController.courses);
router.get("/:id", CourseController.read);
router.post("/:id/update", CourseController.update);
router.post("/create", CourseController.create);
router.post("/:id", CourseController.remove); // delete course-- could have used delete request

module.exports = router;
