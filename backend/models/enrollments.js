const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
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

  semester: {
    type: String,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  attendance: {
    type: Number,
  },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
