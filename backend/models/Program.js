import mongoose, { Schema } from "mongoose";

import Course from "./Courses.js";
import Student from "./Student.js";
import User from "./User.js";
import Leave from "./Leave.js";

const programSchema = new mongoose.Schema({
  program_name: { type: String, required: true },
  description: { type: String },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

programSchema.pre(
  "deleteOne",
  {
    document: true,
    query: false,
  },
  async function (next) {
    try {
      const students = await Student.find({ program: this._id });
      // const stuIds = students.map((emp) => emp._id);
      const userIds = students.map((emp) => emp.userId);
      await Student.deleteMany({ program: this._id });
      await Course.deleteMany({ program: this._id });

      // await Leave.deleteMany({ studentId: { $in: stuIds } });
      // await Salary.deleteMany({ employeeId: { $in: empIds } });
      await User.deleteMany({ _id: { $in: userIds } });
      next();
    } catch (error) {
      next(error);
    }
  }
);
const Program = mongoose.model("Program", programSchema);
export default Program;
