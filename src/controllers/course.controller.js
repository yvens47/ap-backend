const User = require("../models/user.model");
const Course = require("../models/course.model");
const Chapter = require("../models/chapter.model");
const ObjectId = require("mongoose").Types.ObjectId;

// const courseEmitter = Course.watch();
// const chapterEmitter = Chapter.watch();

// courseEmitter.on("change", (change) =>
//   console.log("line 8---------------------", change)
// );

// chapterEmitter.on("change", (change) =>
//   console.log("line 11---------------", change)
// );
/*
 to display all courses
*/

courses = async (req, res) => {
  try {
    const c = Course.find({ status: "Published" }, (error, docs) => {
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
  try {
    const doc = await Course.create(req.body);

    // handle error [user can only post one comment]
    if (doc.code === 11000) {
      return res.status(400).json({ data: doc, success: true });
    }

    res.status(200).json({ data: doc, success: true });
  } catch (e) {
    // unable to create and save user

    res.status(400).json(e).end();
  }
  //res.json(req.body);
  // check user id  or redirected
  // get  user posted data from the req object
  // insert data to db
  // then send jason data back with  object key succes true or false
};
/*
 to read one course
*/
read = async (req, res) => {
  const { id } = req.params;

  try {
    Course.findById(id, (error, doc) => {
      if (error || !doc) {
        return res.json({
          message: "Sorry! The Course you are looking for does not exist ",
          error: true
        });
      }
      res.json(doc);
    });
  } catch (error) {
    res.json(error);
  }
};

// createCourseSectionComment = async (req, res) => {
//   const { id, sectionid } = req.params;
//   const testComment = {
//     id: sectionid,
//     name: "Jetest",
//     text: "I am a sample comment",
//     createdAt: "2021-03-04T05:00:00.000+00:00",
//     user_image: "https://material-ui.com/static/images/avatar/1.jpg",
//     likes: 60
//   };
//   try {
//     const doc = await Comment.create(testComment);
//     res.status(200).json({ data: doc, success: true });
//   } catch (e) {
//     // unable to create and save user
//     res.json(e).end();
//   }
// };

/*
 to update course
*/
update = async (req, res) => {
  const { courseid, status } = req.body;

  Course.updateOne({ _id: courseid }, { status: status }, (err, doc) => {
    console.log(doc);
    res.json(doc);
  });
};

remove = async (req, res) => {
  const { userid, courseid } = req.body;

  const c = await Course.findOne({ _id: courseid }).remove();
  //console.log(c);
  if (c) {
    Chapter.find({ courseid: ObjectId(courseid) })
      .remove()
      .exec();
  }

  // res.json({ data: req.body });
};

module.exports = CourseController = {
  courses,
  create,
  read,
  update,
  remove
};
