const User = require("../models/user.model");
const Course = require("../models/course.model");
const Comment = require("../models/comment.model");
const Chapter = require("../models/chapter.model");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const Upload = multer({ storage: storage }).single("file");

/*
 to display all courses
*/
chapters = async (req, res, next) => {
  const { courseid } = req.params;

  try {
    const c = Chapter.find({ courseid: courseid }, (error, docs) => {
      res.json(docs);
    });
  } catch (error) {
    res.json(error);
  }
};

/*
 to create new course
*/
create = async (req, res) => {
  res.json(req.body);
  try {
    const doc = await Chapter.create(req.body);
    // handle error [user can only post one comment]
    if (doc.code === 11000) {
      return res.status(400).json({ data: doc, success: true });
    }
    res.status(200).json({ data: doc, success: true });
  } catch (e) {
    // unable to create and save user
    res.status(400).json(e);
  }
};

addLesson = async (req, res) => {
  const { chapterid } = req.body;

  const lesson = {
    cover:
      "https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    desciption:
      "Ut facilisis, enim sed cursus porttitor, mi risus bibendum nisl, in dapibus orci orci tincidunt arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec neque fermentum, tempor leo volutpat, finibus urna. Nulla lobortis dictum mollis.",
    title: "Lorem ipsum dolor sit amet, consectetu - new",
    video:
      "https://player.vimeo.com/external/363624829.sd.mp4?s=aaa1e698aaf493ff35bbd568c9e476668e669518&profile_id=139&oauth2_token_id=57447761"
  };

  Chapter.update(
    { _id: chapterid },
    { $addToSet: { lessons: lesson } },
    (error, doc) => {
      if (error) return res.json(error);

      res.json(doc);
    }
  );
};

update = async (req, res) => {
  // console.log(req.body);
  const { title, about, id } = req.body;
  Chapter.updateOne({ _id: id }, { title: title, about: about }, (err, doc) => {
    if (err) res.json(err);
    res.json(doc);
  });
};

remove = async (req, res) => {
  try {
    const { chapterId } = req.body;

    Chapter.deleteOne({ _id: chapterId }, (err, doc) => {
      if (err) res.json(error);
      res.json(doc);
    });
  } catch (error) {
    res.json(error);
  }
};
upload = async (req, res) => {
  console.log(req.file);
};

module.exports = ChapterConttroller = {
  chapters,
  create,
  remove,
  update,
  upload,

  addLesson
};
