import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  description: { type: String },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
