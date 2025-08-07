const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  department: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },

  enrollmentYear: {
    type: String,

    required: true,
  },

  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  attendance: {
    type: Array,
    default: [],
  },
  grades: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Student", userSchema);
