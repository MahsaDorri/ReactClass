var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
//Course schema
var CourseSchema = new Schema({
  courseCode: String,
  courseName: String,
  section: String,
  semester: String,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

mongoose.model("Course", CourseSchema);