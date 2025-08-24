import mongoose, { Schema } from "mongoose";

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: {
    type: String,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  coursesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  attendance: {
    type: Array,
    default: [],
  },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
