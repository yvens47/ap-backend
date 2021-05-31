// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Chapter = require("./chapter.model");

// define UserSchema
const CourseSchema = new mongoose.Schema(
  {
    name: String,

    author: String,
    cover: String,
    about: { type: String, maxLength: 90 },
    type: String,
    status: { type: String, default: "Draft" },
    category: String,
    user_id: ObjectId
  },
  { timestamps: true }
);

CourseSchema.pre("remove", () => console.log("Hello from pre save"));

//CourseSchema.pre("save", () => console.log("Hello from pre save"));

// model
module.exports = mongoose.model("Course", CourseSchema);
