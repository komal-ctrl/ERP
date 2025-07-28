const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Grade", GradeSchema);

// {
//   "studentId": ObjectId,
//   "courseId": ObjectId,
//   "grade": "A",
//   "semester": "2023-Fall"
// }
