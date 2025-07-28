const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  date: {
    type: Date,
  },

  status: {
    type: String,

    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
// {
//   "studentId": ObjectId,
//   "courseId": ObjectId,
//   "date": "2025-07-20",
//   "status": "present"
// }
