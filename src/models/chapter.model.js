// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define UserSchema
const ChapterSchema = new mongoose.Schema(
  {
    title: String,
    lessons: [],
    description: String,
    courseid: Schema.ObjectId,
    completed: { type: Boolean, default: false },
    about: ""
  },
  { timestamps: true }
);

// model
module.exports = mongoose.model("Chapter", ChapterSchema);
