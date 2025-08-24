import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  studentId: { type: String, required: true, unique: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    require: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    require: true,
  },
  dob: { type: Date },
  enrollmentYear: { type: String, require: true },
  gender: { type: String },
  semester: { type: Number, min: 1, max: 10 },
  grades: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

studentSchema.pre(
  "deleteOne",
  {
    document: true,
    query: false,
  },
  async function (next) {
    try {
      await User.findByIdAndDelete({ _id: this.userId });

      next();
    } catch (error) {
      next(error);
    }
  }
);
const Student = mongoose.model("Student", studentSchema);
export default Student;
