const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  department: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  coursesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  attendance: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
