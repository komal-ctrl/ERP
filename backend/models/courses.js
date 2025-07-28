const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,

    trim: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,

    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",

    required: true,
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  credits: {
    type: Number,
  },
});

module.exports = mongoose.model("Course", courseSchema);
